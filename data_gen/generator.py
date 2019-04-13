import pandas as pd
from random import randint

def generate_schools(output_func=print):
    """
    Generates school data.

    Parameters
    ----------
    output_func: func
        function taking a list representing
        ['SchoolCode', 'SchoolName', 'Address', 'City', 'StateCode', 'ZipCode']

    Returns
    -------
    Data frame schools with columns
    ['SchoolCode', 'SchoolName', 'Address', 'City', 'StateCode', 'ZipCode']
    """
    
    desired_school = ['SchoolCode', 'SchoolName', 'Address', 'City', 'StateCode', 'ZipCode']

    data = pd.read_csv(schools_filename)

    print(data.info())

    schools = data.loc[:, data.columns.isin(desired_school)]

    print(schools.head())

    # .dropna().unique()  # TODO : drop null/repeats
    # note a lof of schools have 00000 zip

    print(len(data['SchoolName']), len(schools))

    for i, row in schools.iterrows():
        output_func(list(row))  

    return schools


def generate_users(user_count, output_func=print):
    """
    Generates users

    Parameters
    ----------
    user_count: int
        Number of users to generate.

    output_func: func
        function taking a list representing
        [username, hash, profile_img_url, student_flag, admin_flag]
    
    Returns
    -------
    list of usernames used
    """

    def custom_hash(i):
        return abs(i*444 - 22)

    usernames = []
    with open(usernames_filename) as file:
        usernames = file.readlines()

    usernames = [usernames[randint(0, len(usernames)-1)].strip() for i in range(user_count)]

    for i in range(user_count):
        row = [
            usernames[randint(0, len(usernames)-1)],
            custom_hash(i),
            f'{base_url}/file/{i}',  # TODO
            int(i % 177 != 0),
            int(i > 3) 
               ]
        
        output_func(row)

    return usernames

if __name__ == '__main__':
    base_url = 'api'  # TODO
    
    schools_filename = '1920FedSchoolCodeList_2 - 19-20 2nd Quarter FSC.csv'
    usernames_filename = 'usernames.txt'

    pd.set_option('display.max_columns', None)

    # generate_schools()
    # generate_users(12) 



    """  # courses
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(25) NOT NULL,
    `name` VARCHAR(60) NULL DEFAULT NULL,
    `year` CHAR(4) NOT NULL,
    `semester` VARCHAR(6) NOT NULL,
    `professor` VARCHAR(45) NULL DEFAULT NULL,
    `school` CHAR(6) NOT NULL,
    """

    """  # Attends
    `username` VARCHAR(30) NOT NULL,
    `school_code` CHAR(6) NOT NULL,
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
