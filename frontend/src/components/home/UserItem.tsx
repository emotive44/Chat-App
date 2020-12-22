import React, { FC } from 'react';

import { User, UserName, UserStatus } from './UserItem.styles';


export interface UserItemProps {
  name: string;
  _id: string;
  isOnline: boolean;
  clickHandler: Function;
}

const UserItem: FC<UserItemProps> = ({ name, _id, isOnline, clickHandler }) => {
  return (
    <User onClick={() => clickHandler({ name, _id})}>
      <UserName>{name}</UserName>
      <UserStatus isOnline={isOnline} />
    </User>
  )
}

export default UserItem;
