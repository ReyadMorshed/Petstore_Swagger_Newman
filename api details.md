# API Test Cases Document: Petstore Swagger

**Project:** Petstore API Testing Bootcamp

**Author:** Gemini

**Date:** February 17, 2026

---

## 1. User Endpoint Group (`/user`)

### TC-01: Create User (Happy Path)

* **Request:** `POST /user` with JSON body containing `username`, `firstName`, `lastName`, etc.
* **Expected Status:** `200 OK`
* **Key Assertions:**
* Response code is `200`.
* Response body contains `message` (the user ID).
* Response time is less than 500ms.


* **Cleanup Strategy:** `DELETE /user/{{userName}}` after execution.

### TC-02: Get User by Username (Happy Path)

* **Request:** `GET /user/{{userName}}`
* **Expected Status:** `200 OK`
* **Key Assertions:**
* `firstName` equals `{{firstName}}`.
* `email` matches the user profile.


* **Cleanup Strategy:** None required.

### TC-03: Create User with Invalid Email (Negative Case)

* **Request:** `POST /user` with `email: "invalid-email-format"`.
* **Expected Status:** `400 Bad Request` or specific application error.
* **Key Assertions:**
* Verify error message indicates invalid email format.


* **Cleanup Strategy:** None.

### TC-04: Get Non-Existent User (Negative Case)

* **Request:** `GET /user/non_existent_user_9999`
* **Expected Status:** `404 Not Found`
* **Key Assertions:**
* Response message contains "User not found".


* **Cleanup Strategy:** None.

---

## 2. Pet Endpoint Group (`/pet`)

### TC-05: Update Pet Name - Boundary Case (Happy Path)

* **Request:** `PUT /pet` with a very long string (e.g., 255 characters) for the `name` field.
* **Expected Status:** `200 OK`
* **Key Assertions:**
* Verify the system accepts and stores the long string without truncation.


* **Cleanup Strategy:** Reset pet name via another `PUT` request.

### TC-06: Add Pet with Empty ID (Boundary Case)

* **Request:** `POST /pet` with `id: 0` (The system should auto-generate an ID).
* **Expected Status:** `200 OK`
* **Key Assertions:**
* Verify the response returns a numeric ID greater than 0.


* **Cleanup Strategy:** `DELETE /pet/{{generated_id}}`.

---

## 3. Assertions Snippets (Postman/Newman)

For your `runner.js` to pass successfully, ensure these scripts are in your Postman collection:

```javascript
// Example Status Code Assertion
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Example JSON Body Assertion
pm.test("First Name is correct", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.firstName).to.eql(pm.collectionVariables.get("firstName"));
});

```
I've updated the API Test Cases Document to include the **Store** endpoint group. This section is critical for testing the e-commerce logic of the Petstore, such as inventory management and order processing.

---

# API Test Cases Document: Petstore Swagger

**Project:** Petstore API Testing Bootcamp

**Version:** 1.1 (Added Store API)

**Date:** February 17, 2026

---

## 3. Store Endpoint Group (`/store`)

### TC-07: Place an Order (Happy Path)

* **Request:** `POST /store/order`
* **Body:** JSON with `petId`, `quantity`, and `status: "placed"`.
* **Expected Status:** `200 OK`
* **Key Assertions:**
* Response contains a unique `id` for the order.
* `complete` status is a boolean.
* The `shipDate` is returned in a valid ISO-8601 format.


* **Cleanup Strategy:** `DELETE /store/order/{{orderID}}`.

### TC-08: Check Inventory Status (Happy Path)

* **Request:** `GET /store/inventory`
* **Expected Status:** `200 OK`
* **Key Assertions:**
* Response is a JSON object where keys are status names (e.g., "available", "sold").
* Values for each status are integers .


* **Cleanup Strategy:** None.

### TC-09: Order with Invalid Pet ID (Negative Case)

* **Request:** `POST /store/order` with `petId: -1` or a non-existent ID.
* **Expected Status:** `400 Bad Request` or `404 Not Found` (depending on API implementation).
* **Key Assertions:**
* Verify error message explains that the Pet ID is invalid.


* **Cleanup Strategy:** None.

### TC-10: Find Order by Invalid ID (Boundary Case)

* **Request:** `GET /store/order/999999999999999` (Extreme boundary value).
* **Expected Status:** `404 Not Found`
* **Key Assertions:**
* Response body contains "Order not found".
* Response time is  (ensuring database index efficiency).


* **Cleanup Strategy:** None.

---

## 4. Assertion Scripts for Store

Add these to your Postman Collection "Tests" tab for the Store requests:

```javascript
// Check if inventory returns numeric values
pm.test("Inventory counts are numbers", function () {
    var jsonData = pm.response.json();
    pm.expect(typeof jsonData.available).to.eql("number");
});

// Validate Order Placement
pm.test("Order ID is present", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
    // Save orderID for cleanup
    pm.collectionVariables.set("orderID", jsonData.id);
});

```

---

### Implementation Note for your `runner.js`

Since you are saving reports to `D:\...\reports\postman`, this document serves as the **Requirements Traceability Matrix (RTM)**. When you open your `report.html`, you should see these test case titles matching your Postman request names.
