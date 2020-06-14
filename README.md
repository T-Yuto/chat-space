# README

![chat-reload](/Readme/chatspace-animate.gif)

## groups_users テーブル

| Column   | Type       | Options                        |
| -------- | ---------- | ------------------------------ |
| user_id  | references | null: false, foreign_key: true |
| group_id | references | null: false, foreign_key: true |

### Association

- belongs_to :group
- belongs_to :user

## messages テーブル

| Column   | Type      | Options                        |
| -------- | --------- | ------------------------------ |
| text     | text      |                                |
| image    | text      |                                |
| user_id  | refernces | null: false, foreign_key: true |
| gropu_id | refernces | null: false, foreign_key: true |

### Association

- belongs_to :group
- belongs_to :user

## users テーブル

| Column   | Type   | Options                  |
| -------- | ------ | ------------------------ |
| name     | string | null: false, index: true |
| password | string | null: false              |
| email    | string | null: false              |

### Association

- has_many :groups, through: :groups_users
- has_many :messages
- has_many :groups_users

## groups テーブル

| Column | Type   | Options     |
| ------ | ------ | ----------- |
| name   | string | null: false |

### Association

- has_many :users, through: :groups_users
- has_many :messages
- has_many :groups_users
