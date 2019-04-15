import pandas as pd
from random import randint
    
schools_filename = '1920FedSchoolCodeList_2 - 19-20 2nd Quarter FSC.csv'
usernames_filename = 'usernames.txt'

action = print

def length_mask(df, item_comparisons):
        """
	Applies length comparisons to items in dataframe.

	Parameters
	----------
	df: dataframe
		Dataframe to apply mask to
		
	item_comparisons: dict, str: func
		Str is column of dataframe, func is function to apply.
		
	Returns
	------- 
	Boolean
	"""

        filters = [df[index].apply(f) for index, f in item_comparisons.items()]

        for f in filters:
                df = df.loc[f]

        return df
	

def generate_schools(school_count=9999):
	"""
    Generates school data.

    Parameters
    ----------
	school_count: int, default=INF
		Max number of schools

    Returns
    -------
    List of school codes.
    """
	desired_school_data = [
			'SchoolCode', 'SchoolName', 'Address', 
			'City', 'StateCode', 'ZipCode']
    
	raw = pd.read_csv(schools_filename)

	schools = raw.loc[:, raw.columns.isin(desired_school_data)]

	# drop duplicates
	schools.drop_duplicates(subset=['SchoolCode', 'SchoolName', 'Address'])
	
	# drop invalid
	schools = schools[schools.ZipCode != '00000']
	
	length_filters = {
		'SchoolCode': 	lambda v: len(v) <= 6,
		'SchoolName': 	lambda v: len(v) <= 45,
		'Address': 		lambda v: len(v) <= 45,
		'City': 		lambda v: len(v) <= 45,
		'StateCode': 	lambda v: len(v) == 2, 
		'ZipCode': 		lambda v: len(v) == 5}
	
	schools = length_mask(schools, length_filters)
	
	# style
	schools['SchoolName'] = schools['SchoolName'].apply(lambda s: s.title())
	schools['Address'] = schools['Address'].apply(lambda s: s.title())
	schools['City'] = schools['City'].apply(lambda s: s.title())
	
	if school_count < len(schools):
		step = len(schools) // (school_count-1)
		schools = schools.iloc[::step]

	for i, row in schools.iterrows():
		output = f"INSERT INTO schools VALUES ('{row['SchoolCode']}', '{row['SchoolName']}', '{row['Address']}', '{row['City']}', '{row['StateCode']}', '{row['ZipCode']}');"
		
		action(output)  

	return list(schools['SchoolCode'])


def generate_users(user_count):
	"""
    Generates users
	
    Parameters
    ----------
    user_count: int
        Number of users to generate.
    
    Returns
    -------
    list of usernames used.
    """

	usernames = []
	with open(usernames_filename) as file:
		usernames = file.readlines()

	# drop duplicates
	usernames = list(set(usernames))
	
	# drop invalid
	filter = lambda n: len(n) <= 30 and not any(char in n for char in ('*', '/', ' ', '\\', '_')) 
	usernames = [name.strip() for name in usernames if filter(name)]

	used_names = []
	for i in range(user_count):
		if not len(usernames):
			break

		username = usernames[randint(0, len(usernames)-1)]
		usernames.remove(username)
		used_names.append(username)
		
		row = f"INSERT INTO users (username, hash, profile_img_url, student_flag, admin_flag) VALUES ('{username}', '{str(hash(username))[:100]}', '{f'profile_img/{username}'[:100]}', '{int(i % 177 != 0)}', '{int(i < 3)}');"
		
		action(row)

	return used_names

def generate_attendance(usernames, school_codes):
	"""
	Generates attendance table.
	
	Pre
	---
	Usernames and schoolcodes already fit to DB constraints.
	Usernames and schoolcodes are in users and schools tables.
	
	Parameters
	----------
	usernames: list of str
		Users to assigsn schools.
		
	school_codes: list of str
		School codes to choose from
	"""
	for name in usernames:
		output = f"INSERT INTO attends VALUES ('{name}', '{school_codes[randint(0, len(school_codes)-1)]}');"
	
		action(output)
    

def generate_courses(count, school_codes):
        """
        courses
        """

        last_names = []
        with open('last-names.txt', 'r') as f:
                last_names = f.readlines()
        course_names = []
        with open('courses.txt', 'r') as f:
                course_names = f.readlines()

        for i in range(count):
                name = course_names[randint(0, len(course_names)-1)].strip().title()
                professor = f"Dr. {last_names[randint(0, len(last_names)-1)].strip()}".title()

                
                semester = 'Spring' if randint(0,1) else 'Fall'
                year = randint(2010, 2019)
                number = randint(100, 550)
                
                school = school_codes[randint(0, len(school_codes)-1)]
                
                output = f"INSERT INTO courses (number, name, year, semester, professor, school) VALUES ('{number}', '{name}', '{year}', '{semester}', '{professor}', '{school}');"
                action(output)
                
        return [i for i in range(1, count+1)]


def generate_submissions(submissions_per_course, usernames, course_ids):
        """  # Submissions
        Need to reset the auto-increment id if refershing this table!

        `description` VARCHAR(200) NULL DEFAULT NULL,
        `username` VARCHAR(30) NOT NULL,
        `course_id` INT(11) NOT NULL,
        """
        descriptions = []
        with open('latin.txt', 'r') as f:
                descriptions = f.readlines()

        for cid in course_ids:
                for i in range(submissions_per_course):
                        username = usernames[randint(0, len(usernames)-1)]
                        description = descriptions[randint(0, len(descriptions)-1)].strip()

                        output = f"INSERT INTO submissions (description, username, course_id) VALUES ('{description}', '{username}', '{cid}');"

                        action(output)

        return [i for i in range(1, len(course_ids)*submissions_per_course+1)]

def generate_content(submission_ids):
        """  # Content
        `submission_id` INT(11) NOT NULL,
        `url` VARCHAR(200) NOT NULL,
        `filename` VARCHAR(100) NOT NULL,
        """
        files = ['HW0-10', 'All HW', 'Practice Test', 'Study Guide Test 1','Study Guide Test 1','Study Guide Test 3']
        files += ['HW ' + str(i) for i in range(1, 7)]

        url_to_submissions = {}
        for id in submission_ids:
                filename = files[randint(0, len(files)-1)]
                url = f'/data/{filename}'

                output = f"INSERT INTO content (submission_id, url, filename) VALUES ('{id}', '{url}', '{filename}');"

                action(output)
                url_to_submissions.update({id: url})
        return url_to_submissions

def generate_ratings(usernames, url_to_submissions):
        """  # Ratings
        `submission_id` INT(11) NOT NULL,
        `url` VARCHAR(200) NOT NULL,
        `username` VARCHAR(30) NOT NULL,
        `rating` INT(11) NOT NULL,
        """
        
        for submission_id, url in url_to_submissions.items():
                used_names = []
                username = ""
                for i in range(randint(1, 3)):
                        while username in used_names or username == "":
                                username = usernames[randint(0, len(usernames)-1)]

                        used_names.append(username)
                        rating = randint(1,5)
                        
                        output = f"INSERT INTO ratings (submission_id, url, username, rating) VALUES ('{submission_id}', '{url}', '{username}', '{rating}');"

                        action(output)
                
if __name__ == '__main__':
        pd.set_option('display.max_columns', None)

        with open('sample.sql', 'w') as f:
                action = lambda w: f.write(w + '\n')
                
	
                action("""SET foreign_key_checks = 0;
SET SQL_SAFE_UPDATES = 0;
delete from schools;
delete from users;
SET foreign_key_checks = 1;""")

                school_codes = generate_schools(6)
                usernames = generate_users(40)

                generate_attendance(usernames, school_codes)

                action("ALTER TABLE courses AUTO_INCREMENT = 1;")

                course_ids = generate_courses(50, school_codes)

                action("ALTER TABLE submissions AUTO_INCREMENT = 1;")
                
                submission_ids = generate_submissions(3, usernames, course_ids)

                url_to_submissions = generate_content(submission_ids)

                generate_ratings(usernames, url_to_submissions)
