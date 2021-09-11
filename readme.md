# Boutique Travel Travel Boutique

In this assignment, you will be setting up the Hotel collection for a travel agency's Mongo database. You will create a Mongoose schema according to the company's specifications, use a seed data file to populate model data, and execute Mongoose queries to find and manipulate specific data within the set.

## Learning Objectives
- Create a Mongoose schema with validations
- Execute Mongoose queries to perform CRUD operations

## Set Up

We've started the schema for you in models/hotel.js file. 

## Resources

> [Mongoose Documentation](http://mongoosejs.com/docs/guide.html)

## Automated Testing

This assignment features automated testing to determine completion. After running `npm install` in this directory, you can run the tests from your command line with `npm test` to test your completion of each stage of the assignment. You will also see the results of these tests when pushing your repository to github. Do not modify the contents of the `test` folder. 

## Instructions

### Part 1: Set Up the Hotel Schema

- set up the hotel schema
  - name type string, required true, unique true
  - location type string
  - rating type number, max value 5
  - vacancies type boolean
  - tags type array
    - within the array  type string
  - `rooms` is an array of subdocs with the following properties:
    - roomNumber: Number, 
    - size: String, 
    - price: Number, 
    - booked: Boolean 
  - include timestamps

## Deliverables

What will students need to do to consider the assignment complete. If relevant, include details about submission format and process.

## Stretch Goals

When possible, add stretch goals for students who may finish early to continue their learning.

*Copyright 2021, General Assembly Space. Licensed under [CC-BY-NC-SA, 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)*