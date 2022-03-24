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