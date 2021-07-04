-- -----------------------------------------------------
-- Schema webapp_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `webapp_db` ;
USE `webapp_db` ;

-- -----------------------------------------------------
-- Table `webapp_db`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webapp_db`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webapp_db`.`device`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webapp_db`.`device` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `categoryId` INT NOT NULL,
  `color` VARCHAR(16) NOT NULL,
  `partNumber` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_device_category_idx` (`categoryId` ASC) VISIBLE,
  CONSTRAINT `fk_device_category`
    FOREIGN KEY (`categoryId`)
    REFERENCES `webapp_db`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
