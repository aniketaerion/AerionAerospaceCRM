// src/pages/dealer/crm/leads/Index.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LeadsList from './LeadsList.jsx';
import CreateLead from './CreateLead.jsx';
import LeadDetail from './LeadDetail.jsx';
import LeadPerformance from './LeadPerformance.jsx';
import CrmDashboard from './CrmDashboard.jsx';

import Campaigns from '../campaigns/Campaigns.jsx';
import Contacts from '../contacts/Contacts.jsx';
import Tasks from '../tasks/Tasks.jsx';
import Reminders from '../reminders/Reminders.jsx';
import BulkAssignments from '../bulkassignments/BulkAssignments.jsx';

export default function Index() {
  return (
    <Routes>
      <Route index element={<CrmDashboard />} />
      <Route path="list" element={<LeadsList />} />
      <Route path="add" element={<CreateLead />} />
      <Route path=":leadId" element={<LeadDetail />} />
      <Route path="analytics" element={<LeadPerformance />} />
      <Route path="campaigns" element={<Campaigns />} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="reminders" element={<Reminders />} />
      <Route path="bulkassignments" element={<BulkAssignments />} />
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
}
