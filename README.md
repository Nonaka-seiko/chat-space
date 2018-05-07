# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


# DB設計

   users table

|Colum|Type|Option|
|-----|----|------|
|name|string|index: true, null: false, unique: true|
|mail|string|null: false, unique: true|

   Association
-has_many :groups
-has-many :group_users
-has_many :massages


   groups table

|Colum|Type|Option|
|-----|----|------|
|name|string|index: true, null: false, unique: true|

   Association
-has_many :users
-has_many :group_users
-has_many :messages


   group_users table

|Colum|Type|Option|
|-----|----|------|
|group_id|integer|index: true, foreign_key: true, null: false|
|user_id|integer|index: true, foreign_key: true, null: false|

   Association
-belongs_to :group
-belongs_to :user


   meassage table

|Colum|Type|Option|
|-----|----|------|
|body|text|null: fales|
|image|string|
|group_id|integer|foreign_key: true|
|user_id|integer|foreign_key: true|

   Association
-belongs_to :user
-belongs_to :group
