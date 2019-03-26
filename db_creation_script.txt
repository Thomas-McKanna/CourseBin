-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema development
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema development
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `development` DEFAULT CHARACTER SET utf8 ;
USE `development` ;

-- -----------------------------------------------------
-- Table `development`.`schools`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `development`.`schools` ;

CREATE TABLE IF NOT EXISTS `development`.`schools` (
  `school_code` CHAR(6) NOT NULL,
  `school_name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `state` CHAR(2) NULL,
  `zip_code` CHAR(5) NULL,
  PRIMARY KEY (`school_code`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `development`.`courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `development`.`courses` ;

CREATE TABLE IF NOT EXISTS `development`.`courses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `number` VARCHAR(25) NOT NULL,
  `name` VARCHAR(60) NULL,
  `year` CHAR(4) NOT NULL,
  `semester` VARCHAR(6) NOT NULL,
  `professor` VARCHAR(45) NULL,
  `school` CHAR(6) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `code_idx` (`school` ASC) VISIBLE,
  CONSTRAINT `school_code`
    FOREIGN KEY (`school`)
    REFERENCES `development`.`schools` (`school_code`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `development`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `development`.`users` ;

CREATE TABLE IF NOT EXISTS `development`.`users` (
  `username` VARCHAR(30) NOT NULL,
  `hash` VARCHAR(100) NOT NULL,
  `date_created` DATE GENERATED ALWAYS AS (CURDATE()) VIRTUAL,
  `profile_img_url` VARCHAR(100) NULL,
  `student_flag` TINYINT NOT NULL,
  `admin_flag` TINYINT NOT NULL,
  PRIMARY KEY (`username`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `development`.`attends`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `development`.`attends` ;

CREATE TABLE IF NOT EXISTS `development`.`attends` (
  `username` VARCHAR(30) NOT NULL,
  `school_code` CHAR(6) NOT NULL,
  PRIMARY KEY (`username`, `school_code`),
  INDEX `school_code_idx` (`school_code` ASC) VISIBLE,
  CONSTRAINT `username`
    FOREIGN KEY (`username`)
    REFERENCES `development`.`users` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `school_code`
    FOREIGN KEY (`school_code`)
    REFERENCES `development`.`schools` (`school_code`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `development`.`submissions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `development`.`submissions` ;

CREATE TABLE IF NOT EXISTS `development`.`submissions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date_created` DATE GENERATED ALWAYS AS (CURDATE()) VIRTUAL,
  `description` VARCHAR(200) NULL,
  `username` VARCHAR(30) NOT NULL,
  `course_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `username_idx` (`username` ASC) VISIBLE,
  INDEX `course_id_idx` (`course_id` ASC) VISIBLE,
  CONSTRAINT `username`
    FOREIGN KEY (`username`)
    REFERENCES `development`.`users` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `course_id`
    FOREIGN KEY (`course_id`)
    REFERENCES `development`.`courses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `development`.`has_taken`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `development`.`has_taken` ;

CREATE TABLE IF NOT EXISTS `development`.`has_taken` (
  `username` VARCHAR(30) NOT NULL,
  `course_id` INT NOT NULL,
  PRIMARY KEY (`username`, `course_id`),
  INDEX `course_id_idx` (`course_id` ASC) VISIBLE,
  CONSTRAINT `username`
    FOREIGN KEY (`username`)
    REFERENCES `development`.`users` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `course_id`
    FOREIGN KEY (`course_id`)
    REFERENCES `development`.`courses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `development`.`content`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `development`.`content` ;

CREATE TABLE IF NOT EXISTS `development`.`content` (
  `submission_id` INT NOT NULL,
  `url` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`submission_id`, `url`),
  CONSTRAINT `submission_id`
    FOREIGN KEY (`submission_id`)
    REFERENCES `development`.`submissions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `development`.`ratings`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `development`.`ratings` ;

CREATE TABLE IF NOT EXISTS `development`.`ratings` (
  `submission_id` INT NOT NULL,
  `url` VARCHAR(200) NOT NULL,
  `username` VARCHAR(30) NOT NULL,
  `rating` INT NOT NULL,
  PRIMARY KEY (`submission_id`, `url`, `username`),
  INDEX `username_idx` (`username` ASC) VISIBLE,
  CONSTRAINT `submission_id_url`
    FOREIGN KEY (`submission_id` , `url`)
    REFERENCES `development`.`content` (`submission_id` , `url`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `username`
    FOREIGN KEY (`username`)
    REFERENCES `development`.`users` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
