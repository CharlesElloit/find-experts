## User model
```
name: string
email: string
isContractor: Boolean
password: string
resetPasswordToken: string
resetPasswordTokenExpires: Date
createdAt: Date
updatedAt: Date
```

## Rating Model
```
userId: rated_to_ID
rating: number
created: {
  At: Date,
  created_by: created_by_ID
}
updated: {
  At: Date,
}
```
## Review Model
```
userId: review_to_ID
comment: string
created: {
  At: Date,
  created_by: created_by_ID
},
updated: {
  At: Date,
}
```

