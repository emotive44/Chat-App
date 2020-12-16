import React, { FC } from 'react';
import './UserItem.css';


export interface UserItemProps {
  name: string;
  _id: string;
}

const UserItem: FC<UserItemProps> = ({ name, _id }) => {
  return (
    <div className="user-item" data-user={_id}>
      <span>{name}</span>
      <small />
    </div>
  )
}

export default UserItem;
