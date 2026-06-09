/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UploadedCollection {
  id: number;
  collection_name: string;
  file_name: string;
  uploaded_by: string;
  uploaded_at: string;
  total_apis: number;
  status: 'Pending' | 'Parsing' | 'Converting' | 'Validating' | 'Completed' | 'Failed';
}

export interface ApiDetail {
  id: number;
  collection_id: number;
  api_name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  headers: string; // JSON string or object description
  request_body: string; // JSON string or text
  query_params: string; // Query parameters
}

export interface GeneratedTestCase {
  id: number;
  api_id: number;
  testcase_name: string;
  testcase_type: 'Positive' | 'Negative' | 'Boundary' | 'Security';
  expected_result: string;
  generated_at: string;
}

export interface GeneratedScript {
  id: number;
  api_id: number;
  script_name: string;
  script_content: string;
  created_at: string;
}

export interface AiRecommendation {
  id: number;
  api_id: number;
  recommendation: string;
  recommendation_type: 'Functional' | 'Security' | 'Performance';
  generated_at: string;
}

export interface SampleCollection {
  name: string;
  description: string;
  apis: Omit<ApiDetail, 'id' | 'collection_id'>[];
  assertions: string[];
}
