import React, { FC } from 'react';
import './UserItem.css';


export interface UserItemProps {
  name: string;
  _id: string;
  isOnline: boolean;
}

const UserItem: FC<UserItemProps> = ({ name, _id, isOnline }) => {
  return (
    <div className="user-item" data-user={_id}>
      <span>{name}</span>
      <small className={isOnline ? 'online' : ''} />
    </div>
  )
}

export default UserItem;
