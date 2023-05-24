import { Button, Card, Descriptions, Modal, Space, Typography } from "antd";
import { Breadcrumb } from "antd";
import List from "./list/list";
import Link from "next/link";
import React, { useState } from "react";
import JobForm from "./JobForm";
import Head from "next/head";
import { JobApplication } from "@/__generated__/graphql";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

const { Title } = Typography;

const GET_OPORTUNITY = gql(`
  query JobApplication ($id: String!) {
    jobApplication (id: $id) {
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

export default function JobOportunity() {
  const router = useRouter();
  const jobId = router.query.jobId;

  const { loading, data } = useQuery(GET_OPORTUNITY, {
    variables: { id: jobId },
  });

  return (
    <div>
      <Head>
        <title>Job applications | Hiremancer</title>
      </Head>
      <Title>{data?.jobApplication.title}</Title>
      <Breadcrumb
        items={[
          {
            title: <Link href="/">Home</Link>,
          },
          {
            title: <Link href="/oportunities">Job applications</Link>,
          },
          {
            title: data?.jobApplication.title,
          },
        ]}
      />
      <div style={{ marginTop: "40px" }}>
        {loading && <p>Loading</p>}
        {!loading && data && (
          <Space direction="vertical">
            <Card>
              <Descriptions title="General">
                <Descriptions.Item label="Company">
                  {data.jobApplication.company?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Stage">
                  {data.jobApplication.stage}
                </Descriptions.Item>
                <Descriptions.Item label="Salary">
                  {data.jobApplication.salaryAmount}
                </Descriptions.Item>
                <Descriptions.Item label="Salary">
                  {data.jobApplication.salaryAmount}
                  <span
                    style={{ fontSize: 10, marginLeft: 10 }}
                  >{`(${data.jobApplication.salaryBase})`}</span>
                </Descriptions.Item>
              </Descriptions>
            </Card>
            <Card
              title="Updates"
              extra={
                <Button type="primary" onClick={() => {}}>
                  Add
                </Button>
              }
            ></Card>
          </Space>
        )}
      </div>
    </div>
  );
}
