BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [passwordHash] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Project] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [model] NVARCHAR(1000) NOT NULL,
    [systemPrompt] NVARCHAR(1000),
    [temperature] FLOAT(53),
    [topP] FLOAT(53),
    [maxTokens] INT,
    [inputCostPerMillion] FLOAT(53) NOT NULL CONSTRAINT [Project_inputCostPerMillion_df] DEFAULT 0,
    [cachedInputCostPerMillion] FLOAT(53) NOT NULL CONSTRAINT [Project_cachedInputCostPerMillion_df] DEFAULT 0,
    [outputCostPerMillion] FLOAT(53) NOT NULL CONSTRAINT [Project_outputCostPerMillion_df] DEFAULT 0,
    [allowedQualityDrop] FLOAT(53) NOT NULL CONSTRAINT [Project_allowedQualityDrop_df] DEFAULT 2,
    [cacheEnabled] BIT NOT NULL CONSTRAINT [Project_cacheEnabled_df] DEFAULT 1,
    [cacheTtlSeconds] INT NOT NULL CONSTRAINT [Project_cacheTtlSeconds_df] DEFAULT 3600,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Project_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Project_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Dataset] (
    [id] NVARCHAR(1000) NOT NULL,
    [projectId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [version] INT NOT NULL CONSTRAINT [Dataset_version_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Dataset_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Dataset_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[TestCase] (
    [id] NVARCHAR(1000) NOT NULL,
    [datasetId] NVARCHAR(1000) NOT NULL,
    [input] NVARCHAR(1000) NOT NULL,
    [expectedOutput] NVARCHAR(1000),
    [metadata] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [TestCase_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [TestCase_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Evaluator] (
    [id] NVARCHAR(1000) NOT NULL,
    [projectId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [config] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Evaluator_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Evaluator_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Experiment] (
    [id] NVARCHAR(1000) NOT NULL,
    [projectId] NVARCHAR(1000) NOT NULL,
    [datasetId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [model] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [Experiment_status_df] DEFAULT 'QUEUED',
    [useCache] BIT NOT NULL CONSTRAINT [Experiment_useCache_df] DEFAULT 1,
    [failOnRegression] BIT NOT NULL CONSTRAINT [Experiment_failOnRegression_df] DEFAULT 1,
    [allowedQualityDrop] FLOAT(53) NOT NULL CONSTRAINT [Experiment_allowedQualityDrop_df] DEFAULT 2,
    [qualityScore] FLOAT(53),
    [passRate] FLOAT(53),
    [avgLatencyMs] FLOAT(53),
    [totalTokens] INT NOT NULL CONSTRAINT [Experiment_totalTokens_df] DEFAULT 0,
    [totalCostUsd] FLOAT(53) NOT NULL CONSTRAINT [Experiment_totalCostUsd_df] DEFAULT 0,
    [cacheHitRate] FLOAT(53) NOT NULL CONSTRAINT [Experiment_cacheHitRate_df] DEFAULT 0,
    [cacheMissRate] FLOAT(53) NOT NULL CONSTRAINT [Experiment_cacheMissRate_df] DEFAULT 0,
    [llmCallsAvoided] INT NOT NULL CONSTRAINT [Experiment_llmCallsAvoided_df] DEFAULT 0,
    [cachedInputTokens] INT NOT NULL CONSTRAINT [Experiment_cachedInputTokens_df] DEFAULT 0,
    [estimatedCostSavedUsd] FLOAT(53) NOT NULL CONSTRAINT [Experiment_estimatedCostSavedUsd_df] DEFAULT 0,
    [regressionDelta] FLOAT(53),
    [regressionPassed] BIT NOT NULL CONSTRAINT [Experiment_regressionPassed_df] DEFAULT 1,
    [errorMessage] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Experiment_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Experiment_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[EvaluationResult] (
    [id] NVARCHAR(1000) NOT NULL,
    [experimentId] NVARCHAR(1000) NOT NULL,
    [testCaseId] NVARCHAR(1000) NOT NULL,
    [actualOutput] NVARCHAR(1000) NOT NULL,
    [score] FLOAT(53) NOT NULL,
    [passed] BIT NOT NULL,
    [latencyMs] INT,
    [ttftMs] INT,
    [inputTokens] INT,
    [outputTokens] INT,
    [totalTokens] INT,
    [estimatedCostUsd] FLOAT(53),
    [uncachedEstimatedCostUsd] FLOAT(53),
    [cacheHit] BIT NOT NULL CONSTRAINT [EvaluationResult_cacheHit_df] DEFAULT 0,
    [cachedInputTokens] INT NOT NULL CONSTRAINT [EvaluationResult_cachedInputTokens_df] DEFAULT 0,
    [reason] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [EvaluationResult_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [EvaluationResult_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[GithubIntegration] (
    [id] NVARCHAR(1000) NOT NULL,
    [projectId] NVARCHAR(1000) NOT NULL,
    [repositoryName] NVARCHAR(1000) NOT NULL,
    [repositoryId] NVARCHAR(1000),
    [installationId] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [GithubIntegration_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [GithubIntegration_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Baseline] (
    [id] NVARCHAR(1000) NOT NULL,
    [projectId] NVARCHAR(1000) NOT NULL,
    [experimentId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Baseline_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Baseline_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Baseline_projectId_key] UNIQUE NONCLUSTERED ([projectId])
);

-- CreateTable
CREATE TABLE [dbo].[ProjectCiToken] (
    [id] NVARCHAR(1000) NOT NULL,
    [projectId] NVARCHAR(1000) NOT NULL,
    [tokenHash] NVARCHAR(1000) NOT NULL,
    [tokenPrefix] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ProjectCiToken_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [revokedAt] DATETIME2,
    CONSTRAINT [ProjectCiToken_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ProjectCiToken_projectId_key] UNIQUE NONCLUSTERED ([projectId]),
    CONSTRAINT [ProjectCiToken_tokenHash_key] UNIQUE NONCLUSTERED ([tokenHash])
);

-- AddForeignKey
ALTER TABLE [dbo].[Project] ADD CONSTRAINT [Project_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Dataset] ADD CONSTRAINT [Dataset_projectId_fkey] FOREIGN KEY ([projectId]) REFERENCES [dbo].[Project]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TestCase] ADD CONSTRAINT [TestCase_datasetId_fkey] FOREIGN KEY ([datasetId]) REFERENCES [dbo].[Dataset]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Evaluator] ADD CONSTRAINT [Evaluator_projectId_fkey] FOREIGN KEY ([projectId]) REFERENCES [dbo].[Project]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Experiment] ADD CONSTRAINT [Experiment_projectId_fkey] FOREIGN KEY ([projectId]) REFERENCES [dbo].[Project]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Experiment] ADD CONSTRAINT [Experiment_datasetId_fkey] FOREIGN KEY ([datasetId]) REFERENCES [dbo].[Dataset]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[EvaluationResult] ADD CONSTRAINT [EvaluationResult_experimentId_fkey] FOREIGN KEY ([experimentId]) REFERENCES [dbo].[Experiment]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[EvaluationResult] ADD CONSTRAINT [EvaluationResult_testCaseId_fkey] FOREIGN KEY ([testCaseId]) REFERENCES [dbo].[TestCase]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[GithubIntegration] ADD CONSTRAINT [GithubIntegration_projectId_fkey] FOREIGN KEY ([projectId]) REFERENCES [dbo].[Project]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Baseline] ADD CONSTRAINT [Baseline_projectId_fkey] FOREIGN KEY ([projectId]) REFERENCES [dbo].[Project]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProjectCiToken] ADD CONSTRAINT [ProjectCiToken_projectId_fkey] FOREIGN KEY ([projectId]) REFERENCES [dbo].[Project]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

