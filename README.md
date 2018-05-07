# DB設計

##users table

|Colum|Type|Option|
|-----|----|------|
|name|string|index: true, null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|unique:true|

###Association

-has_many :groups, through::group_users table

-has-many :group_users

-has_many :messages


##groups table

|Colum|Type|Option|
|-----|----|------|
|name|string|null: false, unique: true|

###Association

-has_many :users, through::group_users table

-has_many :group_users

-has_many :messages


##group_users table

|Colum|Type|Option|
|-----|----|------|
|group_id|reference|foreign_key: true, null: false|
|user_id|reference|foreign_key: true, null: false|

###Association

-belongs_to :group

-belongs_to :user


##meassage table

|Colum|Type|Option|
|-----|----|------|
|body|text|
|image|string|
|group_id|reference|foreign_key: true|
|user_id|reference|foreign_key: true|

###Association

-belongs_to :user

-belongs_to :group
