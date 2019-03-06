CS 2300-1A

Cole Dieckhaus, Sierra Madrid, Thomas McKanna

# Course Project - Phase 1: Conceptual Database Design

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

![DB Diagram](phase_one.png)

The following assumptions have been made with regard to the above diagram:

* A student does not need to have attended a school, taken any courses, or made any submissions to make an account.
* Each course must be associated with a particular school.
* Two courses that are about the same subject but are taught by different schools are considered different courses.
* A submission must be associated with a particular course and a particular student.
* A submission must have at least one piece of content (an uploaded file) associated with it.

## Functional Requirements

Search and retrieve content for specific school by school name or location
* Option to sort results by popularity or upload date
* Involves Student, School, and Submission entities
* The student searches for content from a specifc school
* The school offers courses that have submissions
* The submissions are those that the student it searching for

Search and retrieve content for specific course by name or school name
* Option to sort results by popularity or upload date
* Involves Student, School, and Submission entities
* The student searches for content from a specific course
* The school offers courses that have submissions
* The submissions are those that the student is searching for

Create an account
* Involves the Student or Admin entity
* A student can create an account
* An admin can create an account

User submits content to be uploaded
* Involves Student, School, Course, and Submission entities
* The student uploads the submission
* The course is what the submission is about
* The school offers the course the submission is about

Rate submissions based on relavancy and accuracy 
* Involves Student and Submission entities
* The student rates the submission
* The submission is rated by the student
