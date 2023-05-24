import { JobApplication } from "@/__generated__/graphql";
import { gql, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Dropdown,
  Row,
  Space,
  Typography,
} from "antd";
import Item from "./item";
import React from "react";

const { Title, Text } = Typography;

const GET_OPORTUNITIES = gql(`
  query JobApplications {
    jobApplications {
      id
      title
      stage
      company {
        name
      }
      salaryAmount
      salaryBase
    }
  }
`);

type JobAplicationListArgs = {
  onEdit: (jobApplication: JobApplication) => void;
};

const List: React.FC<JobAplicationListArgs> = ({ onEdit }) => {
  const { loading, data } = useQuery(GET_OPORTUNITIES);
  if (loading) {
    return <p>Loading</p>;
  }

  const stages = [
    "DRAFT",
    "LEAD",
    "APPLIED",
    "FIRST_MEETING_SCHEDULED",
    "FIRST_MEETING_DONE",
    "CHALLENGE",
    "OFFER",
    "CLOSED",
    "REJECTED",
  ];
  const toTitle = (s: string) => {
    s = s.replaceAll("_", " ").toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <div style={{ overflowX: "scroll" }}>
      <div
        style={{
          width: "3200px",
          display: "flex",
        }}
      >
        {stages.map((stage) => (
          <div
            key={stage} 
            style={{ display: "flex", width: "340px", marginBottom: "20px" }}
          >
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <Title level={3}>{toTitle(stage)}</Title>
              {data.jobApplications.map(
                (jobApplication: JobApplication, index: number) => {
                  if (jobApplication.stage === stage) {
                    return <Item jobApplication={jobApplication} key={index} onEdit={onEdit} />;
                  }
                }
              )}
            </Space>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;