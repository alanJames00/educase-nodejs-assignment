# Educase NodeJS Assignment

## Problem Statement

Implement a set of APIs using Node.js, Express.js framework, and MySQL to manage school data. The system should allow users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

## Endpoints

### Add School

**Request URL:** `POST school/addSchool`
**Sample Request Body:**

```json
{
  "name": "Lakeside Middle School",
  "address": "101 Lakeside Dr, Lakeview",
  "latitude": 41.8781,
  "longitude": -87.6298
}
```

**Success Response:**

```json
{
  "info": "school_added",
  "schoolId": 4
}
```

**Error Response(400) Missing fields:**

```json
{
  "err": "missing_fields"
}
```

**Error Response(400) Non-numeric latitude or longitude:**

```json
{
  "err": "latitude_and_longitude_must_be_numbers"
}
```

### List Schools

- List schools sorted by proximity to a user-specified location.

**Request URL:** `GET school/listSchools`
**Query Parameters:** - `lat`: Latitude of the user's location - `long`: Longitude of the user's location

**Sample Request URL:** `GET school/listSchools?lat=41.8781&long=-87.6298`

**Success Response:**

```json
[
  {
    "id": 4,
    "name": "Lakeside Middle School",
    "address": "101 Lakeside Dr, Lakeview",
    "latitude": 41.878101,
    "longitude": -87.629799
  },
  {
    "id": 3,
    "name": "Sunnydale Elementary",
    "address": "789 Sunnydale Blvd, Riverside",
    "latitude": 40.712799,
    "longitude": -74.005997
  },
  {
    "id": 2,
    "name": "Blue Mountain Academy",
    "address": "456 Blue Mountain Rd, Hilltown",
    "latitude": 34.0522,
    "longitude": -118.243698
  },
  {
    "id": 1,
    "name": "Green Valley High School",
    "address": "123 Green Valley St, Springfield",
    "latitude": 37.774899,
    "longitude": -122.419403
  }
]
```

**Error Response(400) Missing fields:**

```json
{
  "err": "missing_fields"
}
```

**Error Response(400) Non-numeric latitude or longitude:**

```json
{
  "err": "latitude_and_longitude_must_be_numbers"
}
```
