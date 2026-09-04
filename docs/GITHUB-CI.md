# GitHub CI integration

After deploying EvalOps, add the custom action to a customer repository.

Example `.github/workflows/evalops.yml`:

```yaml
name: EvalOps

on:
  pull_request:
    branches: [main]

jobs:
  eval:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Qubrid EvalOps
        uses: your-org/qubrid-evalops/github-action@main
        with:
          api-url: ${{ secrets.EVALOPS_API_URL }}
          project-id: ${{ secrets.EVALOPS_PROJECT_ID }}
          token: ${{ secrets.EVALOPS_TOKEN }}
```

`EVALOPS_TOKEN` is a dedicated EvalOps user/API credential. Do not put the Qubrid API key in the repository. The backend/worker owns the Qubrid secret.

The action starts a CI evaluation with `useCache=false`, polls the experiment, and exits non-zero if the final experiment fails its configured regression gate.
