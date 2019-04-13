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
	filters = [filter(df[index].str.len()) for index, filter in item_comparisons.items()]

	mask = filters[0]
	for f in filters:
		mask = mask & f
		
	return mask
	

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
		'SchoolCode': 	lambda v: v <= 6,
		'SchoolName': 	lambda v: v <= 45,
		'Address': 		lambda v: v <= 45,
		'City': 		lambda v: v <= 45,
		'StateCode': 	lambda v: v == 2, 
		'ZipCode': 		lambda v: v == 5}
	
	schools = schools.loc[length_mask(schools, length_filters)]
	
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
		
		row = f"INSERT INTO users VALUES ('{username}', '{str(hash(username))[:100]}', '{f'profile_img/{username}'[:100]}', '{int(i % 177 != 0)}', '{int(i < 3)}')"
		
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
		output = f"INSERT INTO attends VALUES ('{name}', '{school_codes[randint(0, len(school_codes)-1)]}')"
	
		action(output)
    

if __name__ == '__main__':
	pd.set_option('display.max_columns', None)

	school_codes = generate_schools(6)
	usernames = generate_users(12) 

	generate_attendance(usernames, school_codes)
	
	"""  # courses
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(25) NOT NULL,
    `name` VARCHAR(60) NULL DEFAULT NULL,
    `year` CHAR(4) NOT NULL,
    `semester` VARCHAR(6) NOT NULL,
    `professor` VARCHAR(45) NULL DEFAULT NULL,
    `school` CHAR(6) NOT NULL,
    """

	"""  # Submissions
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `date_created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `description` VARCHAR(200) NULL DEFAULT NULL,
    `username` VARCHAR(30) NOT NULL,
    `course_id` INT(11) NOT NULL,
    """

	"""  # Content
    `submission_id` INT(11) NOT NULL,
    `url` VARCHAR(200) NOT NULL,
    `filename` VARCHAR(100) NOT NULL,
    """

	"""  # Ratings
    `submission_id` INT(11) NOT NULL,
    `url` VARCHAR(200) NOT NULL,
    `username` VARCHAR(30) NOT NULL,
    `rating` INT(11) NOT NULL,
    """
