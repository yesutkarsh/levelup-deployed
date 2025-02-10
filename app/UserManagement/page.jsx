import React from 'react'
import UserManagement from './UserManagement'
import USERAPPROVALSECURITYCHECK from '../../components/SECURITYCHECK/USERAPPROVAL/USERAPPROVALSECURITYCHECK'
export default function page() {
  return (
    <USERAPPROVALSECURITYCHECK>
    <UserManagement/>
    </USERAPPROVALSECURITYCHECK>
  )
}
