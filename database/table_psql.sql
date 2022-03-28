create table countries(
  country_id                      serial              not null,
  name                            varchar(250)        not null,
  state                           varchar(1)          not null  /* '(A)ctive, (P)assive - default active' */,
  constraint countries_pk primary key (country_id),
  constraint countries_u1 unique (name),
  constraint countries_c1 check (state in ('A', 'P')),
  check (country_id >= 0)
);

-- ---------------------------------------------------------------------------------- --
create table regions(
  region_id                       serial              not null,
  name                            varchar(250)        not null,
  country_id                      int                 not null,
  state                           varchar(1)          not null /* '(A)ctive, (P)assive - default active' */,
  constraint regions_pk primary key (region_id),
  constraint regions_u1 unique (name),
  constraint regions_f1 foreign key (country_id) references countries(country_id) on delete cascade,
  constraint regions_c1 check (state in ('A', 'P')),
  check (region_id >= 0),
  check (country_id >= 0)
  /* 'list of reference regions in the system' */
);

create index regions_i1 on regions(country_id);

-- ------------------------------------------------------------------------------------------
create table persons(
  person_id                       serial              not null,
  first_name                      varchar(250)        not null,
  last_name                       varchar(250)        not null,
  middle_name                     varchar(250),
  passport_number                 varchar(250)        not null,
  date_of_birth                   timestamp            not null,
  place_of_birth                  int                 not null,
  gender                          varchar(1)          not null  /* '(M)ale, (F)emale' */,
  region_id                       int                 not null,
  address                         varchar(250)        not null,
  phone                           varchar(250),
  email                           varchar(250),
  constraint persons_pk primary key (person_id),
  constraint persons_u1 unique (first_name, last_name, middle_name),
  constraint persons_u2 unique (passport_number),
  constraint persons_f1 foreign key (place_of_birth) references regions(region_id),
  constraint persons_f2 foreign key (region_id) references regions(region_id),
  constraint persons_c1 check (gender in ('M', 'F')),
  check (person_id >= 0),
  check (place_of_birth >= 0),
  check (region_id >= 0)
  /* 'list of reference persons in the system' */
);

create index persons_i1 on persons(place_of_birth);
create index persons_i2 on persons(region_id);

-- --------------------------------------------------------------
create table blood_groups(
  blood_group_id                  serial              not null,
  name                            varchar(250)        not null,
  constraint blood_groups_pk primary key (blood_group_id),
  constraint blood_groups_u1 unique (name),
  check (blood_group_id >= 0)
  -- 'list of reference blood groups in the system'
);

-- --------------------------------------------------------------------------------------------------
create table hospitals(
  hospital_id                     serial              not null,
  name                            varchar(250)        not null,
  region_id                       int                 not null,
  address                         varchar(250)        not null,
  phone                           varchar(250),
  fax                             varchar(250),
  state                           varchar(1)          not null, --'(A)ctive, (P)assive - default active'
  constraint hospitals_pk primary key (hospital_id),
  constraint hospitals_u1 unique (name),
  constraint hospitals_f1 foreign key (region_id) references regions(region_id),
  constraint hospitals_c1 check (state in ('A', 'P')),
  check (hospital_id >= 0),
  check (region_id >= 0)
  -- list of reference hospitals in the system
);

create index hospitals_i1 on hospitals(region_id);

-- --------------------------------------------------------------------------------------------------
create table employees(
  employee_id                     serial              not null,
  person_id                       int                 not null,
  hospital_id                     int                 not null,
  job_title                       varchar(250)        not null,
  start_date                      timestamp           not null,
  end_date                        timestamp,
  salary                          varchar(250)        not null,
  state                           varchar(1)          not null, -- '(A)ctive, (P)assive - default active'
  constraint employees_pk primary key (employee_id),
  constraint employees_f1 foreign key (person_id) references persons(person_id),
  constraint employees_f2 foreign key (hospital_id) references hospitals(hospital_id),
  constraint employees_c1 check (end_date is null or start_date < end_date),
  constraint employees_c2 check (state in ('A', 'P')),
  check (employee_id >= 0),
  check (person_id >= 0),
  check (hospital_id >= 0)
  -- list of reference hospital employees in the system
);

create index employees_i1 on employees(person_id);
create index employees_i2 on employees(hospital_id);

-- --------------------------------------------------------------------------------------------------
create table procedure_types(
  procedure_type_id               serial              not null,
  name                            varchar(250)        not null,
  constraint procedure_types_pk primary key (procedure_type_id),
  constraint procedure_types_u1 unique (name),
  check (procedure_type_id >= 0)
  -- list of reference procedure types in the system
);

-- --------------------------------------------------------------------------------------------------
create table procedures(
  procedure_id                    serial              not null,
  patient_id                      int                 not null,
  hospital_id                     int                 not null,
  procedure_type_id               int                 not null,
  start_time                      timestamp,
  end_time                        timestamp,
  status                          varchar(1)          not null, -- '(W)aiting, (S)cheduled, on (G)oing, (P)aused, (F)inished',
  constraint procedures_pk primary key (procedure_id),
  constraint procedures_f1 foreign key (patient_id) references persons(person_id),
  constraint procedures_f2 foreign key (hospital_id) references hospitals(hospital_id),
  constraint procedures_f3 foreign key (procedure_type_id) references procedure_types(procedure_type_id),
  constraint procedures_c1 check (start_time is null or end_time is null or start_time < end_time),
  constraint procedures_c2 check (status in ('W', 'S', 'G', 'P', 'F')),
  constraint procedures_c3 check (start_time is null and status in ('W', 'S') or start_time is not null),
  constraint procedures_c4 check (end_time is null and status in ('W', 'S', 'G', 'P') or end_time is not null),
  check (procedure_id >= 0),
  check (patient_id >= 0),
  check (hospital_id >= 0),
  check (procedure_type_id >= 0)
  -- list of curing procedures in the hospital
);

create index procedures_i1 on procedures(patient_id);
create index procedures_i2 on procedures(hospital_id);
create index procedures_i3 on procedures(procedure_type_id);

-- --------------------------------------------------------------------------------------------------
create table procedure_doctors(
  procedure_doctor_id             serial              not null,
  procedure_id                    int                 not null,
  doctor_id                       int                 not null,
  doctor_role                     varchar(250)        not null,
  start_time                      timestamp,
  end_time                        timestamp,
  status                          varchar(1)          not null, -- '(W)aiting, (S)cheduled, on (G)oing, (P)aused, (F)inished',
  constraint procedure_doctors_pk primary key (procedure_id, doctor_id),
  constraint procedure_doctors_f1 foreign key (procedure_id) references procedures(procedure_id),
  constraint procedure_doctors_f2 foreign key (doctor_id) references employees(employee_id),
  constraint procedure_doctors_c1 check (start_time is null or end_time is null or start_time < end_time),
  constraint procedure_doctors_c2 check (status in ('W', 'S', 'G', 'P', 'F')),
  constraint procedure_doctors_c3 check (start_time is null and status in ('W', 'S') or start_time is not null),
  constraint procedure_doctors_c4 check (end_time is null and status in ('W', 'S', 'G', 'P') or end_time is not null),
  check (procedure_doctor_id >= 0),
  check (procedure_id >= 0),
  check (doctor_id >= 0)
  -- list of curing procedures in the hospital
);

create index procedure_doctors_i1 on procedure_doctors(procedure_id);
create index procedure_doctors_i2 on procedure_doctors(doctor_id);

-- --------------------------------------------------------------------------------------------------
create table blood_drawings(
  drawing_id                      serial              not null,
  procedure_id                    int                 not null,
  blood_group_id                  int                 not null,
  amount                          int                 not null,
  expiry_date                     timestamp            not null,
  status                          varchar(1)          not null, -- '(A)vailable, (N)not available, (D)onated, (E)xpired',
  constraint blood_drawings_pk primary key (drawing_id),
  constraint blood_drawings_f1 foreign key (procedure_id) references procedures(procedure_id),
  constraint blood_drawings_f2 foreign key (blood_group_id) references blood_groups(blood_group_id),
  constraint blood_drawings_c1 check (status in ('A', 'N', 'D', 'E')),
  check (drawing_id >= 0),
  check (procedure_id >= 0),
  check (blood_group_id >= 0),
  check (amount >= 0)
  -- blood bank of the hospital
);

create index blood_drawings_i1 on blood_drawings(procedure_id);
create index blood_drawings_i2 on blood_drawings(blood_group_id);

-- --------------------------------------------------------------------------------------------------
create table blood_donations(
  donation_id                     serial              not null,
  procedure_id                    int                 not null,
  drawing_id                      int                 not null,
  constraint blood_donations_pk primary key (donation_id),
  constraint blood_donations_f1 foreign key (procedure_id) references procedures(procedure_id),
  constraint blood_donations_f2 foreign key (drawing_id) references blood_drawings(drawing_id),
  check (donation_id >= 0),
  check (procedure_id >= 0),
  check (drawing_id >= 0)
  -- blood donations of the hospital
);

create index blood_donations_i1 on blood_donations(procedure_id);
create index blood_donations_i2 on blood_donations(drawing_id);
