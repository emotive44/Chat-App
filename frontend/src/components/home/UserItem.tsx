import React, { FC } from 'react';
import './UserItem.css';


export interface UserItemProps {
  name: string;
  _id: string;
  isOnline: boolean;
  clickHandler: Function;
}

const UserItem: FC<UserItemProps> = ({ name, _id, isOnline, clickHandler }) => {
  return (
    <div className="user-item" onClick={() => clickHandler(name)}>
      <span>{name}</span>
      <small className={isOnline ? 'online' : ''} />
    </div>
  )
}

export default UserItem;
