"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API_URL, authHeaders } from "../../../../lib-api";

type TestCase = {
  id: string;
  input: string;
  expectedOutput?: string | null;
  metadata?: string | null;
  createdAt: string;
};

type Dataset = {
  id: string;
  name: string;
  description?: string | null;
  version: number;
  createdAt: string;
  testCases: TestCase[];
};

type ImportedTestCase = {
  input: string;
  expectedOutput?: string;
  metadata?: Record<string, unknown>;
};

function parseCSV(
  text: string
): ImportedTestCase[] {
  const rows: string[][] = [];

  let row: string[] = [];
  let field = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && next === '"') {
      field += '"';
      i++;
      continue;
    }

    if (char === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (char === "," && !insideQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if (
      (char === "\n" || char === "\r") &&
      !insideQuotes
    ) {
      if (char === "\r" && next === "\n") {
        i++;
      }

      row.push(field);

      if (
        row.some(
          (value) => value.trim() !== ""
        )
      ) {
        rows.push(row);
      }

      row = [];
      field = "";

      continue;
    }

    field += char;
  }

  if (
    field.length > 0 ||
    row.length > 0
  ) {
    row.push(field);

    if (
      row.some(
        (value) => value.trim() !== ""
      )
    ) {
      rows.push(row);
    }
  }

  if (rows.length < 2) {
    throw new Error(
      "CSV must contain a header row and at least one test case."
    );
  }

  const headers = rows[0].map(
    (header) => header.trim()
  );

  const inputIndex = headers.findIndex(
    (header) =>
      header.toLowerCase() === "input"
  );

  const expectedIndex = headers.findIndex(
    (header) =>
      header.toLowerCase() ===
      "expectedoutput"
  );

  if (inputIndex === -1) {
    throw new Error(
      'CSV must contain an "input" column.'
    );
  }

  return rows
    .slice(1)
    .map((row) => ({
      input:
        row[inputIndex]?.trim() ?? "",

      expectedOutput:
        expectedIndex !== -1
          ? row[
              expectedIndex
            ]?.trim() ?? ""
          : "",
    }))
    .filter(
      (testCase) => testCase.input
    );
}

function parseJSONImport(
  text: string
): ImportedTestCase[] {
  try {
    const parsed = JSON.parse(text);

    const testCases = Array.isArray(parsed)
      ? parsed
      : parsed?.testCases;

    if (!Array.isArray(testCases)) {
      throw new Error(
        "JSON must be an array or contain a testCases array."
      );
    }

    return testCases;
  } catch (error: any) {
    if (
      error?.message ===
      "JSON must be an array or contain a testCases array."
    ) {
      throw error;
    }

    throw new Error(
      'Invalid JSON format. Please provide a valid JSON array or { "testCases": [...] }.'
    );
  }
}

export default function Datasets() {
  const { id } =
    useParams<{ id: string }>();

  const [datasets, setDatasets] =
    useState<Dataset[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // Create dataset
  const [showCreateForm, setShowCreateForm] =
    useState(false);

  const [datasetName, setDatasetName] =
    useState("");

  const [datasetDescription, setDatasetDescription] =
    useState("");

  const [creatingDataset, setCreatingDataset] =
    useState(false);

  // Expanded dataset
  const [expandedDatasetId, setExpandedDatasetId] =
    useState<string | null>(null);

  // Add test case
  const [addingTestCaseTo, setAddingTestCaseTo] =
    useState<string | null>(null);

  const [testInput, setTestInput] =
    useState("");

  const [expectedOutput, setExpectedOutput] =
    useState("");

  const [addingTestCase, setAddingTestCase] =
    useState(false);

  // Bulk import
  const [
    importingDatasetId,
    setImportingDatasetId,
  ] = useState<string | null>(null);

  const [importFile, setImportFile] =
    useState<File | null>(null);

  const [importJson, setImportJson] =
    useState("");

  const [
    importPreviewCount,
    setImportPreviewCount,
  ] = useState<number | null>(null);

  const [importing, setImporting] =
    useState(false);

  async function loadDatasets() {
    try {
      setError("");

      const projectResponse =
        await fetch(
          `${API_URL}/api/v1/projects/${id}`,
          {
            headers: authHeaders(),
          }
        );

      const projectData =
        await projectResponse.json();

      if (!projectResponse.ok) {
        throw new Error(
          projectData?.message ||
            "Failed to load project"
        );
      }

      const projectDatasets =
        projectData.data?.datasets ?? [];

      /*
       * Fetch each dataset's test cases.
       */
      const datasetsWithTestCases =
        await Promise.all(
          projectDatasets.map(
            async (dataset: any) => {
              try {
                const response =
                  await fetch(
                    `${API_URL}/api/v1/projects/${id}/datasets/${dataset.id}`,
                    {
                      headers:
                        authHeaders(),
                    },
                  );

                const data =
                  await response.json();

                if (!response.ok) {
                  return {
                    ...dataset,
                    testCases: [],
                  };
                }

                return {
                  ...dataset,
                  testCases:
                    data.data
                      ?.testCases ?? [],
                };
              } catch {
                return {
                  ...dataset,
                  testCases: [],
                };
              }
            }
          )
        );

      setDatasets(
        datasetsWithTestCases
      );
    } catch (err: any) {
      setError(
        err.message ||
          "Failed to load datasets"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      loadDatasets();
    }
  }, [id]);

  async function createDataset() {
    try {
      setError("");

      if (!datasetName.trim()) {
        setError(
          "Please enter a dataset name."
        );
        return;
      }

      setCreatingDataset(true);

      const response =
        await fetch(
          `${API_URL}/api/v1/projects/${id}/datasets`,
          {
            method: "POST",
            headers: {
              ...authHeaders(),
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              name: datasetName.trim(),
              description:
                datasetDescription.trim() ||
                undefined,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to create dataset"
        );
      }

      setDatasetName("");
      setDatasetDescription("");
      setShowCreateForm(false);

      await loadDatasets();
    } catch (err: any) {
      setError(
        err.message ||
          "Failed to create dataset"
      );
    } finally {
      setCreatingDataset(false);
    }
  }

  async function addTestCase(
    datasetId: string
  ) {
    try {
      setError("");

      if (!testInput.trim()) {
        setError(
          "Please enter the test case input."
        );
        return;
      }

      setAddingTestCase(true);

      const response =
        await fetch(
          `${API_URL}/api/v1/projects/${id}/datasets/${datasetId}/test-cases`,
          {
            method: "POST",
            headers: {
              ...authHeaders(),
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              input: testInput.trim(),
              expectedOutput:
                expectedOutput.trim() ||
                undefined,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to add test case"
        );
      }

      setTestInput("");
      setExpectedOutput("");
      setAddingTestCaseTo(null);

      await loadDatasets();
    } catch (err: any) {
      setError(
        err.message ||
          "Failed to add test case"
      );
    } finally {
      setAddingTestCase(false);
    }
  }

  function previewImportFile(
    file: File | null
  ) {
    setImportFile(file);
    setImportPreviewCount(null);
    setError("");

    if (!file) {
      return;
    }

    readImportSource(file);
  }

  function previewImportJson(
    value: string
  ) {
    setImportJson(value);
    setImportPreviewCount(null);
    setError("");

    if (!value.trim()) {
      return;
    }

    try {
      const testCases =
        parseJSONImport(value);

      setImportPreviewCount(
        testCases.length
      );
    } catch {
      /*
       * Do not show an error while the user
       * is still typing incomplete JSON.
       */
    }
  }

  async function readImportSource(
    file: File
  ) {
    try {
      const text =
        await file.text();

      if (
        file.name
          .toLowerCase()
          .endsWith(".json")
      ) {
        const testCases =
          parseJSONImport(text);

        setImportPreviewCount(
          testCases.length
        );

        return;
      }

      if (
        file.name
          .toLowerCase()
          .endsWith(".csv")
      ) {
        const testCases =
          parseCSV(text);

        setImportPreviewCount(
          testCases.length
        );

        return;
      }

      throw new Error(
        "Please select a CSV or JSON file."
      );
    } catch (err: any) {
      setImportPreviewCount(null);

      setError(
        err.message ||
          "Failed to read import file."
      );
    }
  }

  async function importTestCases(
    datasetId: string
  ) {
    try {
      setError("");

      /*
       * Do not disable the import button
       * when the fields are empty.
       *
       * Instead, show a useful message.
       */
      if (
        !importFile &&
        !importJson.trim()
      ) {
        throw new Error(
          "Select a CSV/JSON file or paste JSON."
        );
      }

      setImporting(true);

      let testCases: ImportedTestCase[] =
        [];

      /*
       * FILE IMPORT
       */
      if (importFile) {
        const text =
          await importFile.text();

        if (
          importFile.name
            .toLowerCase()
            .endsWith(".json")
        ) {
          testCases =
            parseJSONImport(text);
        } else if (
          importFile.name
            .toLowerCase()
            .endsWith(".csv")
        ) {
          testCases =
            parseCSV(text);
        } else {
          throw new Error(
            "Please upload a CSV or JSON file."
          );
        }
      }

      /*
       * JSON TEXT IMPORT
       */
      else if (importJson.trim()) {
        testCases =
          parseJSONImport(importJson);
      }

      if (!Array.isArray(testCases)) {
        throw new Error(
          "Invalid import format."
        );
      }

      if (testCases.length === 0) {
        throw new Error(
          "No test cases found."
        );
      }

      if (testCases.length > 5000) {
        throw new Error(
          "Maximum 5000 test cases can be imported at once."
        );
      }

      /*
       * Validate every test case
       */
      const invalidIndex =
        testCases.findIndex(
          (testCase) =>
            !testCase ||
            typeof testCase.input !==
              "string" ||
            !testCase.input.trim()
        );

      if (invalidIndex !== -1) {
        throw new Error(
          `Test case ${
            invalidIndex + 1
          } must contain a non-empty input field.`
        );
      }

      /*
       * Send all test cases to the bulk API.
       */
      const response =
        await fetch(
          `${API_URL}/api/v1/projects/${id}/datasets/${datasetId}/test-cases/bulk`,
          {
            method: "POST",
            headers: {
              ...authHeaders(),
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              testCases,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to import test cases"
        );
      }

      /*
       * Reset import UI after success.
       */
      setImportFile(null);
      setImportJson("");
      setImportPreviewCount(null);
      setImportingDatasetId(null);

      await loadDatasets();
    } catch (err: any) {
      setError(
        err.message ||
          "Failed to import test cases"
      );
    } finally {
      setImporting(false);
    }
  }

  function toggleDataset(
    datasetId: string
  ) {
    setExpandedDatasetId(
      expandedDatasetId === datasetId
        ? null
        : datasetId
    );

    setAddingTestCaseTo(null);
    setImportingDatasetId(null);
    setImportFile(null);
    setImportJson("");
    setImportPreviewCount(null);
    setError("");
  }

  function openImport(
    datasetId: string
  ) {
    const isSameDataset =
      importingDatasetId ===
      datasetId;

    if (isSameDataset) {
      setImportingDatasetId(null);
      setImportFile(null);
      setImportJson("");
      setImportPreviewCount(null);
      setError("");
      return;
    }

    setImportingDatasetId(
      datasetId
    );

    setAddingTestCaseTo(null);
    setImportFile(null);
    setImportJson("");
    setImportPreviewCount(null);
    setError("");

    // Automatically expand the dataset.
    setExpandedDatasetId(datasetId);
  }

  if (loading) {
    return (
      <main>
        <div className="card">
          <p>Loading datasets...</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* HEADER */}

      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1>Datasets</h1>

            <p
              style={{
                marginTop: "8px",
                opacity: 0.7,
              }}
            >
              Create and manage regression test
              datasets for your AI evaluations.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setShowCreateForm(
                !showCreateForm
              )
            }
          >
            {showCreateForm
              ? "Cancel"
              : "+ Create Dataset"}
          </button>
        </div>

        {/* ERROR */}

        {error && (
          <div
            style={{
              marginTop: "20px",
              padding: "14px",
              borderRadius: "8px",
              background:
                "rgba(255,80,80,0.1)",
              border:
                "1px solid rgba(255,80,80,0.3)",
              color: "#ff8080",
            }}
          >
            {error}
          </div>
        )}

        {/* CREATE DATASET FORM */}

        {showCreateForm && (
          <div
            style={{
              marginTop: "24px",
              padding: "20px",
              borderRadius: "12px",
              border:
                "1px solid #29334d",
              background:
                "rgba(255,255,255,0.02)",
            }}
          >
            <h2>Create Dataset</h2>

            <p
              style={{
                marginTop: "6px",
                opacity: 0.65,
                fontSize: "14px",
              }}
            >
              Create an empty dataset first,
              then add test cases manually or
              import them in bulk.
            </p>

            <div
              style={{
                marginTop: "18px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                Dataset Name
              </label>

              <input
                value={datasetName}
                onChange={(e) =>
                  setDatasetName(
                    e.target.value
                  )
                }
                placeholder="e.g. Refund Regression v2"
                style={{
                  width: "100%",
                  maxWidth: "600px",
                }}
              />
            </div>

            <div
              style={{
                marginTop: "16px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                Description
              </label>

              <textarea
                value={datasetDescription}
                onChange={(e) =>
                  setDatasetDescription(
                    e.target.value
                  )
                }
                placeholder="Optional description"
                rows={3}
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  resize: "vertical",
                }}
              />
            </div>

            <div
              style={{
                marginTop: "18px",
              }}
            >
              <button
                type="button"
                onClick={createDataset}
                disabled={creatingDataset}
              >
                {creatingDataset
                  ? "Creating..."
                  : "Create Dataset"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* DATASETS */}

      {datasets.length === 0 ? (
        <div className="card">
          <h2>No datasets yet</h2>

          <p
            style={{
              marginTop: "8px",
              opacity: 0.7,
            }}
          >
            Create your first evaluation
            dataset above.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection:
              "column",
            gap: "14px",
          }}
        >
          {datasets.map((dataset) => {
            const expanded =
              expandedDatasetId ===
              dataset.id;

            return (
              <div
                key={dataset.id}
                className="card"
              >
                {/* DATASET HEADER */}

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    gap: "15px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h2>
                      {dataset.name}
                    </h2>

                    {dataset.description && (
                      <p
                        style={{
                          marginTop:
                            "6px",
                          opacity: 0.7,
                        }}
                      >
                        {
                          dataset.description
                        }
                      </p>
                    )}

                    <div
                      style={{
                        marginTop:
                          "8px",
                        display: "flex",
                        gap: "15px",
                        flexWrap:
                          "wrap",
                        fontSize:
                          "13px",
                        opacity: 0.65,
                      }}
                    >
                      <span>
                        Version{" "}
                        {dataset.version}
                      </span>

                      <span>
                        {
                          dataset.testCases
                            .length
                        }{" "}
                        {dataset
                          .testCases
                          .length ===
                        1
                          ? "test case"
                          : "test cases"}
                      </span>

                      <span>
                        Created{" "}
                        {new Date(
                          dataset.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      toggleDataset(
                        dataset.id
                      )
                    }
                  >
                    {expanded
                      ? "Hide Test Cases"
                      : "View Test Cases"}
                  </button>
                </div>

                {/* EXPANDED DATASET */}

                {expanded && (
                  <div
                    style={{
                      marginTop:
                        "20px",
                      paddingTop:
                        "20px",
                      borderTop:
                        "1px solid #29334d",
                    }}
                  >
                    {/* TEST CASE HEADER */}

                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "center",
                        gap: "10px",
                        flexWrap:
                          "wrap",
                      }}
                    >
                      <h3>
                        Test Cases
                      </h3>

                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexWrap:
                            "wrap",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setAddingTestCaseTo(
                              addingTestCaseTo ===
                                dataset.id
                                ? null
                                : dataset.id
                            )
                          }
                        >
                          {addingTestCaseTo ===
                          dataset.id
                            ? "Cancel"
                            : "+ Add Test Case"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            openImport(
                              dataset.id
                            )
                          }
                        >
                          {importingDatasetId ===
                          dataset.id
                            ? "Cancel Import"
                            : "Import Test Cases"}
                        </button>
                      </div>
                    </div>

                    {/* BULK IMPORT */}

                    {importingDatasetId ===
                      dataset.id && (
                      <div
                        style={{
                          marginTop:
                            "18px",
                          padding:
                            "18px",
                          borderRadius:
                            "10px",
                          border:
                            "1px solid #29334d",
                          background:
                            "rgba(255,255,255,0.02)",
                        }}
                      >
                        <h3>
                          Import Test Cases
                        </h3>

                        <p
                          style={{
                            marginTop:
                              "6px",
                            fontSize:
                              "13px",
                            opacity: 0.65,
                          }}
                        >
                          Upload a CSV/JSON
                          file or paste JSON
                          directly. All valid
                          rows will be added
                          to this dataset.
                        </p>

                        {/* FILE */}

                        <div
                          style={{
                            marginTop:
                              "16px",
                          }}
                        >
                          <label
                            style={{
                              display:
                                "block",
                              fontSize:
                                "13px",
                              fontWeight:
                                600,
                              marginBottom:
                                "8px",
                            }}
                          >
                            CSV / JSON File
                          </label>

                          <input
                            type="file"
                            accept=".csv,.json"
                            onChange={(e) =>
                              previewImportFile(
                                e.target
                                  .files?.[0] ??
                                  null
                              )
                            }
                          />

                          {importFile && (
                            <div
                              style={{
                                marginTop:
                                  "8px",
                                fontSize:
                                  "13px",
                                opacity:
                                  0.65,
                              }}
                            >
                              Selected:{" "}
                              {
                                importFile.name
                              }
                            </div>
                          )}

                          {importFile &&
                            importPreviewCount !==
                              null && (
                              <div
                                style={{
                                  marginTop:
                                    "8px",
                                  fontSize:
                                    "13px",
                                }}
                              >
                                {
                                  importPreviewCount
                                }{" "}
                                {importPreviewCount ===
                                1
                                  ? "test case"
                                  : "test cases"}{" "}
                                ready to
                                import.
                              </div>
                            )}
                        </div>

                        {/* OR */}

                        <div
                          style={{
                            marginTop:
                              "16px",
                            textAlign:
                              "center",
                            opacity: 0.5,
                          }}
                        >
                          OR
                        </div>

                        {/* JSON */}

                        <div
                          style={{
                            marginTop:
                              "16px",
                          }}
                        >
                          <label
                            style={{
                              display:
                                "block",
                              fontSize:
                                "13px",
                              fontWeight:
                                600,
                              marginBottom:
                                "8px",
                            }}
                          >
                            Paste JSON
                          </label>

                          <textarea
                            value={
                              importJson
                            }
                            onChange={(e) =>
                              previewImportJson(
                                e.target
                                  .value
                              )
                            }
                            placeholder={`[
  {
    "input": "I bought a laptop 20 days ago. Can I get a refund?",
    "expectedOutput": "The customer is within the 30-day refund period."
  },
  {
    "input": "I bought my laptop 45 days ago.",
    "expectedOutput": "The standard 30-day refund period has expired."
  }
]`}
                            rows={10}
                            style={{
                              width:
                                "100%",
                              resize:
                                "vertical",
                              fontFamily:
                                "monospace",
                            }}
                          />

                          {importJson.trim() &&
                            importPreviewCount !==
                              null && (
                              <div
                                style={{
                                  marginTop:
                                    "8px",
                                  fontSize:
                                    "13px",
                                }}
                              >
                                {
                                  importPreviewCount
                                }{" "}
                                {importPreviewCount ===
                                1
                                  ? "test case"
                                  : "test cases"}{" "}
                                ready to
                                import.
                              </div>
                            )}
                        </div>

                        {/* IMPORT BUTTON */}

                        <div
                          style={{
                            marginTop:
                              "16px",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              importTestCases(
                                dataset.id
                              )
                            }
                            disabled={
                              importing
                            }
                          >
                            {importing
                              ? "Importing..."
                              : "Import Test Cases"}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ADD TEST CASE FORM */}

                    {addingTestCaseTo ===
                      dataset.id && (
                      <div
                        style={{
                          marginTop:
                            "16px",
                          padding:
                            "18px",
                          borderRadius:
                            "10px",
                          border:
                            "1px solid #29334d",
                          background:
                            "rgba(255,255,255,0.02)",
                        }}
                      >
                        <h3>
                          Add Test Case
                        </h3>

                        <div
                          style={{
                            marginTop:
                              "14px",
                          }}
                        >
                          <label
                            style={{
                              display:
                                "block",
                              fontSize:
                                "13px",
                              fontWeight:
                                600,
                              marginBottom:
                                "8px",
                            }}
                          >
                            Input
                          </label>

                          <textarea
                            value={
                              testInput
                            }
                            onChange={(e) =>
                              setTestInput(
                                e.target
                                  .value
                              )
                            }
                            placeholder="Enter the user input/question"
                            rows={4}
                            style={{
                              width:
                                "100%",
                              resize:
                                "vertical",
                            }}
                          />
                        </div>

                        <div
                          style={{
                            marginTop:
                              "14px",
                          }}
                        >
                          <label
                            style={{
                              display:
                                "block",
                              fontSize:
                                "13px",
                              fontWeight:
                                600,
                              marginBottom:
                                "8px",
                            }}
                          >
                            Expected Output
                          </label>

                          <textarea
                            value={
                              expectedOutput
                            }
                            onChange={(e) =>
                              setExpectedOutput(
                                e.target
                                  .value
                              )
                            }
                            placeholder="Enter what the model should ideally answer"
                            rows={4}
                            style={{
                              width:
                                "100%",
                              resize:
                                "vertical",
                            }}
                          />
                        </div>

                        <div
                          style={{
                            marginTop:
                              "14px",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              addTestCase(
                                dataset.id
                              )
                            }
                            disabled={
                              addingTestCase
                            }
                          >
                            {addingTestCase
                              ? "Adding..."
                              : "Add Test Case"}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* TEST CASE LIST */}

                    {dataset.testCases
                      .length === 0 ? (
                      <div
                        style={{
                          marginTop:
                            "16px",
                          padding:
                            "24px",
                          border:
                            "1px dashed #29334d",
                          borderRadius:
                            "10px",
                          textAlign:
                            "center",
                        }}
                      >
                        <p
                          style={{
                            opacity: 0.7,
                          }}
                        >
                          This dataset has no
                          test cases yet.
                        </p>

                        <p
                          style={{
                            marginTop:
                              "5px",
                            fontSize:
                              "13px",
                            opacity: 0.5,
                          }}
                        >
                          Add one manually or
                          import multiple
                          test cases above.
                        </p>
                      </div>
                    ) : (
                      <div
                        style={{
                          display:
                            "flex",
                          flexDirection:
                            "column",
                          gap: "10px",
                          marginTop:
                            "16px",
                        }}
                      >
                        {dataset.testCases.map(
                          (
                            testCase,
                            index
                          ) => (
                            <div
                              key={
                                testCase.id
                              }
                              style={{
                                padding:
                                  "16px",
                                border:
                                  "1px solid #29334d",
                                borderRadius:
                                  "10px",
                              }}
                            >
                              <div
                                style={{
                                  display:
                                    "flex",
                                  justifyContent:
                                    "space-between",
                                  gap:
                                    "10px",
                                  flexWrap:
                                    "wrap",
                                }}
                              >
                                <strong>
                                  Test Case{" "}
                                  {index +
                                    1}
                                </strong>

                                <small
                                  style={{
                                    opacity:
                                      0.5,
                                  }}
                                >
                                  {new Date(
                                    testCase.createdAt
                                  ).toLocaleString()}
                                </small>
                              </div>

                              <div
                                style={{
                                  marginTop:
                                    "14px",
                                }}
                              >
                                <small
                                  style={{
                                    opacity:
                                      0.6,
                                  }}
                                >
                                  Input
                                </small>

                                <div
                                  style={{
                                    marginTop:
                                      "6px",
                                    padding:
                                      "12px",
                                    border:
                                      "1px solid #29334d",
                                    borderRadius:
                                      "8px",
                                    lineHeight:
                                      "1.5",
                                    whiteSpace:
                                      "pre-wrap",
                                  }}
                                >
                                  {
                                    testCase.input
                                  }
                                </div>
                              </div>

                              <div
                                style={{
                                  marginTop:
                                    "14px",
                                }}
                              >
                                <small
                                  style={{
                                    opacity:
                                      0.6,
                                  }}
                                >
                                  Expected Output
                                </small>

                                <div
                                  style={{
                                    marginTop:
                                      "6px",
                                    padding:
                                      "12px",
                                    border:
                                      "1px solid #29334d",
                                    borderRadius:
                                      "8px",
                                    lineHeight:
                                      "1.5",
                                    whiteSpace:
                                      "pre-wrap",
                                  }}
                                >
                                  {testCase.expectedOutput ||
                                    "No expected output provided."}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}