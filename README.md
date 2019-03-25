CS 2300-1A

Cole Dieckhaus, Sierra Madrid, Thomas McKanna

# Course Project - Phase 1: Conceptual Database Design

## Roadmap

1. Convert ER diagram to set of relations 
2. Create pseudocode for all the major functions of our application
3. Create MySQL schema creation script
4. Write out the structure of the SQL queries that will be used
5. Implement Express API for executing the queries of step 4.
6. Implement React frontend.

## Problem statement

It can be frustrating to get stuck on a homework assignment when there are no 
relevant resources to help you. By the time a student completes a course they 
have often accumulated a group of files (practice exams, completed homework 
assignments, study materials, etc.), which end up sitting unused on their computer. 
These files could be useful study materials to other students.

Our project idea is to create a database-driven website of course content
collected by students. Users can search for materials shared by other students 
and upload content of their own. Submissions can be rated by other users so that the 
best stand out. This will provide a convenient way to access numerous study 
resources tailored to specific courses.


## EER Diagram

![DB Diagram](phase_two.png)

The following assumptions have been made with regard to the above diagram:

* A student does not need to have attended a school, taken any courses, or made any submissions to make an account.
* Each course must be associated with a particular school.
* Two courses that are about the same subject but are taught by different schools are considered different courses.
* A submission must be associated with a particular course and a particular student.
* A submission must have at least one piece of content (an uploaded file) associated with it.

## Functional Requirements

### Search for courses
* Find submissions based on a user's search criteria, with the option of ordering the results by rating or date. Will use the tables *courses*, *schools*, and *students*.
* Inputs: course number, school name, user name (each of these is optional)

Steps:
1. User fills out form and submits it.
2. Form contents are used to generate query which checks if there are any courses which meet the search criteria (this will involve joining, *courses*, *schools*, and *students* and applying a conditional)
3. Results are returned to the user via a JSON object.
4. The JSON object is parsed and used to generate the list of courses displayed on the user's screen.

### Get submissions
* Given a course id, retrieves the submissions associated with the course. Will use the tables *courses* and *submissions*.
Inputs: course id (note: course id refers to a specific combination of course, school, and semester)

Steps:
1. User either clicks on a course listed in search results or directly types URL.
2. A query is made which retrieves all submissions associated with a particular course.
3. Results are returned to the user via a JSON object; this object contains submission ids.
4. The JSON object is parsed and displayed as clickable buttons on the screen;

### Get content
* Given a submission id, retrieves the content associated with the submissions. Will use the tables *submissions* and *content*.
* Inputs: submission id

Steps:
1. User either clicks on a submission listed in search results or directly types URL.
2. A query is made which retrieves all content associated with a particular submission.
3. Results are returned to the user via a JSON object; this object contains URLs of the content items.
4. The JSON object is parsed and displayed as clickable buttons on the screen; clicking one of the buttons triggers it being downloaded.

### Rate content
* The user rates the content (rating system not yet determined). Will use the tables *students*, *ratings*, and *content*.
Input: content id, rating (rating could be upvote/downvote, or 1-5 stars)

Steps:
1. While on a page displaying the content associated with a particular submission, the user clicks the rating button.
2. The rating and the associated content are combined and inserted into the database.
3. The rating is immediately updated on the client side (superficially); reloading the page retrieves the actual new rating.

## OLD

Create an account
* Involves the Student or Admin entity
* An account can be created for a *student*
* An account can be created for an *administrator*


Student submits content to be uploaded
* Involves Student, School, Course, and Submission entities
* The *student* uploads a *submission* containing content associated with a *school* and *course*

Rate submissions based on relavancy and accuracy 
* Involves Student and Submission entities
* The *student* rates a *submission*
