-- --------------------------------------------------------------------------------------------------
use hospital;
delimiter //
create procedure countries_save
(
  in i_country_id                      int(10) unsigned,
  in i_name                            varchar(250),
  in i_state                           varchar(1)
)
begin
  if i_country_id is null then
    insert into countries(name, state)
    values (i_name, i_state);
  else
    update countries 
      set name = i_name,
          state = i_state
      where country_id = i_country_id;
  end if;
end//
delimiter ;

-- --------------------------------------------------------------------------------------------------
use hospital;
delimiter //
create procedure countries_load
(
  in i_country_id int(10)
)
begin
  select * from countries t
  where (i_country_id is null or t.country_id = i_country_id);
end//
delimiter ;

-- --------------------------------------------------------------------------------------------------
use hospital;
delimiter //
create procedure regions_save
(
  in i_region_id                       int(10),
  in i_name                            varchar(250),
  in i_country_id                      int(10),
  in i_state                           varchar(1)    
)
begin
  if i_region_id is null then
    insert into regions(name, country_id, state)
    values (i_name, i_country_id, i_state);
  else
    update regions 
      set name = i_name,
          country_id = i_country_id,
          state = i_state
      where region_id = i_region_id;
  end if;
end//
delimiter ;

-- --------------------------------------------------------------------------------------------------
use hospital;
delimiter //
create procedure regions_load
(
  in i_region_id int(10)
)
begin
  select * from regions t
  where (i_region_id is null or t.region_id = i_region_id);
end//
delimiter ;

-- --------------------------------------------------------------------------------------------------
use hospital;
delimiter //
create procedure persons_save
(
  i_person_id                       int(10) ,
  i_first_name                      varchar(250),
  i_last_name                       varchar(250),
  i_middle_name                     varchar(250),
  i_passport_number                 varchar(250),
  i_date_of_birth                   datetime,
  i_place_of_birth                  int(10) ,
  i_gender                          varchar(1),
  i_region_id                       int(10) ,
  i_address                         varchar(250),
  i_phone                           varchar(250),
  i_email                           varchar(250)    
)
begin
  if i_person_id is null then
    insert into persons(first_name, last_name, middle_name, passport_number, 
                        date_of_birth, place_of_birth, gender, region_id, address, 
                        phone, email)
    values (i_first_name, i_last_name, i_middle_name, i_passport_number, 
            i_date_of_birth, i_place_of_birth, i_gender, i_region_id, i_address, i_phone, 
            i_email);
  else
    update persons 
      set first_name      = i_first_name,
          last_name       = i_last_name,
          middle_name     = i_middle_name,
          passport_number = i_passport_number,
          date_of_birth   = i_date_of_birth,
          place_of_birth  = i_place_of_birth,
          gender          = i_gender,
          region_id       = i_region_id,
          address         = i_address,
          phone           = i_phone,
          email           = i_email
      where person_id = i_person_id;
  end if;
end//
delimiter ;

-- --------------------------------------------------------------------------------------------------
use hospital;
delimiter //
create procedure persons_load
(
  in i_person_id int(10)
)
begin
  select * from persons t
  where (i_person_id is null or t.person_id = i_person_id);
end//
delimiter ;

-- --------------------------------------------------------------------------------------------------
use hospital;
delimiter //
create procedure hospitals_save
(
  i_hospital_id                     int(10),
  i_name                            varchar(250),
  i_region_id                       int(10),
  i_address                         varchar(250),
  i_phone                           varchar(250),
  i_fax                             varchar(250),
  i_state                           varchar(1)      
)
begin
  if i_hospital_id is null then
    insert into hospitals(name, region_id, address, phone, 
                          fax, state)
    values (i_name, i_region_id ,i_address, i_phone, i_fax, i_state);
  else
    update hospitals 
      set name = i_name,
          region_id = i_region_id,
          address   = i_address,
          phone     = i_phone,
          fax       = i_fax,
          state     = i_state
      where hospital_id = i_hospital_id;
  end if;
end//

-- --------------------------------------------------------------------------------------------------
use hospital;
delimiter //
create procedure hospitals_load
(
  in i_hospital_id int(10)
)
begin
  select * from hospitals t
  where (i_hospital_id is null or t.hospital_id = i_hospital_id);
end//
delimiter ;

-- --------------------------------------------------------------------------------------------------
use hospital;
delimiter //
create procedure employees_save
(
  i_employee_id                     int(10),
  i_person_id                       int(10),
  i_hospital_id                     int(10),
  i_job_title                       varchar(250),    
  i_start_date                      datetime,        
  i_end_date                        datetime,
  i_salary                          varchar(250),  
  i_state                           varchar(1)      
)
begin
  if i_employee_id is null then
    insert into employees(person_id, hospital_id, job_title, start_date,
                          end_date, salary, state)
    values (i_person_id, i_hospital_id, i_job_title, i_start_date, 
            i_end_date, i_salary, i_state);
  else
    update employees 
      set person_id   = i_person_id,
          hospital_id = i_hospital_id,
          job_title   = i_job_title,
          start_date  = i_start_date,
          end_date    = i_end_date,
          salary      = i_salary,
          state       = i_state
      where employee_id = i_employee_id;
  end if;
end//
delimiter ;

-- --------------------------------------------------------------------------------------------------
use hospital;
delimiter //
create procedure employees_load
(
  in i_employee_id int(10)
)
begin
  select * from employees t
  where (i_employee_id is null or t.employee_id = i_employee_id);
end//
delimiter ;

-- --------------------------------------------------------------------------------------------------
use hospital;
delimiter //
create procedure procedure_types_save
(
  in i_procedure_type_id                  int(10),
  in i_name                            varchar(250)
)

begin
  if i_procedure_type_id is null then
    insert into procedure_types(name)
    values (i_name);
  else
    update procedure_types 
      set name = i_name
      where procedure_type_id = i_procedure_type_id;
  end if;
end//
delimiter ;

-- --------------------------------------------------------------------------------------------------
use hospital;
delimiter //
create procedure procedure_types_load
(
  in i_procedure_type_id int(10)
)
begin
  select * from procedure_types t
  where (i_procedure_type_id is null or t.procedure_type_id = i_procedure_type_id);
end//
delimiter ;

-- --------------------------------------------------------------------------------------------------
use hospital;
delimiter //
create procedure procedures_save
(
  i_procedure_id                    int(10),
  i_patient_id                      int(10),
  i_hospital_id                     int(10),
  i_procedure_type_id               int(10),
  i_start_time                      datetime(6),
  i_end_time                        datetime(6),
  i_status                          varchar(1)      
)
begin
  if i_procedure_id is null then
    insert into procedures(patient_id, hospital_id, procedure_type_id, 
                           start_time, end_time, status)
    values (i_patient_id,
            i_hospital_id,
            i_procedure_type_id,
            i_start_time,
            i_end_time,
            i_status);
  else
    update procedures 
      set patient_id        = i_patient_id,
          hospital_id       = i_hospital_id,
          procedure_type_id = i_procedure_type_id,
          start_time        = i_start_time,
          end_time          = i_end_time,
          status            = i_status
      where procedure_id = i_procedure_id;
  end if;
end//
delimiter ;

-- --------------------------------------------------------------------------------------------------
use hospital;
delimiter //
create procedure procedures_load
(
  in i_procedure_id int(10)
)
begin
  select * from procedures t
  where (i_procedure_id is null or t.procedure_id = i_procedure_id);
end//
delimiter ;

-- --------------------------------------------------------------------------------------------------
use hospital;
delimiter //
create procedure procedure_doctors_save
(
  i_procedure_id                    int(10),
  i_doctor_id                       int(10),
  i_doctor_role                     varchar(250),    
  i_start_time                      datetime(6),
  i_end_time                        datetime(6),
  i_status                          varchar(1)      
)
begin
  if i_doctor_id is null then
    insert into procedure_doctors(procedure_id, doctor_role, start_time, 
                                  end_time, status)
    values (i_procedure_id,
            i_doctor_role,
            i_start_time, 
            i_end_time,   
            i_status);
  else
    update procedure_doctors 
      set doctor_role = i_doctor_role,
          start_time  = i_start_time,
          end_time    = i_end_time,
          status      = i_status
      where procedure_id = i_procedure_id
            and doctor_id = i_doctor_id;
  end if;
end//
delimiter ;

-- --------------------------------------------------------------------------------------------------
use hospital;
delimiter //
create procedure procedure_doctors_load
(
  in i_procedure_id int(10),
  in i_doctor_id int(10)
)
begin
  select * from procedure_doctors t
  where (i_procedure_id is null and i_doctor_id is null or t.procedure_id = i_procedure_id
                              and t.doctor_id = i_doctor_id);
end// 
delimiter ;
