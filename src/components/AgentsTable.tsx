import React from 'react';
import { Agent, AgentStatus, statusColors, statusDescriptions } from '../types/Agent';

interface AgentsTableProps {
  agents: Agent[];
  onStatusChange?: (agentId: string, newStatus: AgentStatus) => void;
}

const AgentsTable: React.FC<AgentsTableProps> = ({ agents, onStatusChange }) => {
  const handleStatusChange = (agentId: string, newStatus: AgentStatus) => {
    if (onStatusChange) {
      onStatusChange(agentId, newStatus);
    }
  };

  return (
    <div className="agents-table-container">
      <table className="agents-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Receivable</th>
            <th>Payable</th>
            <th>Issues</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.id}>
              <td>
                <div className="status-cell">
                  <div 
                    className="status-indicator"
                    style={{ backgroundColor: statusColors[agent.status] }}
                  >
                    <select
                      value={agent.status}
                      onChange={(e) => handleStatusChange(agent.id, e.target.value as AgentStatus)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        width: '100%',
                        cursor: 'pointer'
                      }}
                    >
                      {Object.keys(statusColors).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="status-description">
                    {statusDescriptions[agent.status]}
                  </div>
                </div>
              </td>
              <td>
                <div className="entity-cell">
                  <div className="entity-name">{agent.receivable.name}</div>
                  <div className="entity-details">
                    <span>Portal: {agent.receivable.portalName}</span>
                    <span>ERP: {agent.receivable.legalEntity}</span>
                  </div>
                </div>
              </td>
              <td>
                <div className="entity-cell">
                  <div className="entity-name">{agent.payable.name}</div>
                  <div className="entity-details">
                    <span>Portal: {agent.payable.portalName}</span>
                    <span>ERP: {agent.payable.legalEntity}</span>
                  </div>
                </div>
              </td>
              <td>
                {agent.issues.length > 0 ? (
                  <div className="issues-cell">
                    {agent.issues.map((issue, index) => (
                      <div key={index} className="issue-item">
                        <strong>{issue.name}</strong>
                        <p>{issue.description}</p>
                        <div className="issue-instructions">
                          <small>Instructions: {issue.instructions}</small>
                        </div>
                        <button className="resolve-btn">
                          {issue.resolutionCTA}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="no-issues">No issues</span>
                )}
              </td>
              <td>
                {agent.updatedAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentsTable; 