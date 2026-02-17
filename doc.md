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

---

### Implementation Note for your `runner.js`

Since you are saving reports to `D:\...\reports\postman`, this document serves as the **Requirements Traceability Matrix (RTM)**. When you open your `report.html`, you should see these test case titles matching your Postman request names.
