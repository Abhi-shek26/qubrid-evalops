
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Dataset
 * 
 */
export type Dataset = $Result.DefaultSelection<Prisma.$DatasetPayload>
/**
 * Model TestCase
 * 
 */
export type TestCase = $Result.DefaultSelection<Prisma.$TestCasePayload>
/**
 * Model Evaluator
 * 
 */
export type Evaluator = $Result.DefaultSelection<Prisma.$EvaluatorPayload>
/**
 * Model Experiment
 * 
 */
export type Experiment = $Result.DefaultSelection<Prisma.$ExperimentPayload>
/**
 * Model EvaluationResult
 * 
 */
export type EvaluationResult = $Result.DefaultSelection<Prisma.$EvaluationResultPayload>
/**
 * Model GithubIntegration
 * 
 */
export type GithubIntegration = $Result.DefaultSelection<Prisma.$GithubIntegrationPayload>
/**
 * Model Baseline
 * 
 */
export type Baseline = $Result.DefaultSelection<Prisma.$BaselinePayload>
/**
 * Model ProjectCiToken
 * 
 */
export type ProjectCiToken = $Result.DefaultSelection<Prisma.$ProjectCiTokenPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dataset`: Exposes CRUD operations for the **Dataset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Datasets
    * const datasets = await prisma.dataset.findMany()
    * ```
    */
  get dataset(): Prisma.DatasetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testCase`: Exposes CRUD operations for the **TestCase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TestCases
    * const testCases = await prisma.testCase.findMany()
    * ```
    */
  get testCase(): Prisma.TestCaseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.evaluator`: Exposes CRUD operations for the **Evaluator** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Evaluators
    * const evaluators = await prisma.evaluator.findMany()
    * ```
    */
  get evaluator(): Prisma.EvaluatorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.experiment`: Exposes CRUD operations for the **Experiment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Experiments
    * const experiments = await prisma.experiment.findMany()
    * ```
    */
  get experiment(): Prisma.ExperimentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.evaluationResult`: Exposes CRUD operations for the **EvaluationResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EvaluationResults
    * const evaluationResults = await prisma.evaluationResult.findMany()
    * ```
    */
  get evaluationResult(): Prisma.EvaluationResultDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.githubIntegration`: Exposes CRUD operations for the **GithubIntegration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GithubIntegrations
    * const githubIntegrations = await prisma.githubIntegration.findMany()
    * ```
    */
  get githubIntegration(): Prisma.GithubIntegrationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.baseline`: Exposes CRUD operations for the **Baseline** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Baselines
    * const baselines = await prisma.baseline.findMany()
    * ```
    */
  get baseline(): Prisma.BaselineDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectCiToken`: Exposes CRUD operations for the **ProjectCiToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectCiTokens
    * const projectCiTokens = await prisma.projectCiToken.findMany()
    * ```
    */
  get projectCiToken(): Prisma.ProjectCiTokenDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Project: 'Project',
    Dataset: 'Dataset',
    TestCase: 'TestCase',
    Evaluator: 'Evaluator',
    Experiment: 'Experiment',
    EvaluationResult: 'EvaluationResult',
    GithubIntegration: 'GithubIntegration',
    Baseline: 'Baseline',
    ProjectCiToken: 'ProjectCiToken'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "project" | "dataset" | "testCase" | "evaluator" | "experiment" | "evaluationResult" | "githubIntegration" | "baseline" | "projectCiToken"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Dataset: {
        payload: Prisma.$DatasetPayload<ExtArgs>
        fields: Prisma.DatasetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DatasetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DatasetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>
          }
          findFirst: {
            args: Prisma.DatasetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DatasetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>
          }
          findMany: {
            args: Prisma.DatasetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>[]
          }
          create: {
            args: Prisma.DatasetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>
          }
          createMany: {
            args: Prisma.DatasetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.DatasetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>
          }
          update: {
            args: Prisma.DatasetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>
          }
          deleteMany: {
            args: Prisma.DatasetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DatasetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DatasetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>
          }
          aggregate: {
            args: Prisma.DatasetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDataset>
          }
          groupBy: {
            args: Prisma.DatasetGroupByArgs<ExtArgs>
            result: $Utils.Optional<DatasetGroupByOutputType>[]
          }
          count: {
            args: Prisma.DatasetCountArgs<ExtArgs>
            result: $Utils.Optional<DatasetCountAggregateOutputType> | number
          }
        }
      }
      TestCase: {
        payload: Prisma.$TestCasePayload<ExtArgs>
        fields: Prisma.TestCaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestCaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestCaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>
          }
          findFirst: {
            args: Prisma.TestCaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestCaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>
          }
          findMany: {
            args: Prisma.TestCaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>[]
          }
          create: {
            args: Prisma.TestCaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>
          }
          createMany: {
            args: Prisma.TestCaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TestCaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>
          }
          update: {
            args: Prisma.TestCaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>
          }
          deleteMany: {
            args: Prisma.TestCaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestCaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TestCaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>
          }
          aggregate: {
            args: Prisma.TestCaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestCase>
          }
          groupBy: {
            args: Prisma.TestCaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestCaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestCaseCountArgs<ExtArgs>
            result: $Utils.Optional<TestCaseCountAggregateOutputType> | number
          }
        }
      }
      Evaluator: {
        payload: Prisma.$EvaluatorPayload<ExtArgs>
        fields: Prisma.EvaluatorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EvaluatorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluatorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EvaluatorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluatorPayload>
          }
          findFirst: {
            args: Prisma.EvaluatorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluatorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EvaluatorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluatorPayload>
          }
          findMany: {
            args: Prisma.EvaluatorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluatorPayload>[]
          }
          create: {
            args: Prisma.EvaluatorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluatorPayload>
          }
          createMany: {
            args: Prisma.EvaluatorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EvaluatorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluatorPayload>
          }
          update: {
            args: Prisma.EvaluatorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluatorPayload>
          }
          deleteMany: {
            args: Prisma.EvaluatorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EvaluatorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EvaluatorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluatorPayload>
          }
          aggregate: {
            args: Prisma.EvaluatorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvaluator>
          }
          groupBy: {
            args: Prisma.EvaluatorGroupByArgs<ExtArgs>
            result: $Utils.Optional<EvaluatorGroupByOutputType>[]
          }
          count: {
            args: Prisma.EvaluatorCountArgs<ExtArgs>
            result: $Utils.Optional<EvaluatorCountAggregateOutputType> | number
          }
        }
      }
      Experiment: {
        payload: Prisma.$ExperimentPayload<ExtArgs>
        fields: Prisma.ExperimentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExperimentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExperimentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentPayload>
          }
          findFirst: {
            args: Prisma.ExperimentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExperimentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentPayload>
          }
          findMany: {
            args: Prisma.ExperimentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentPayload>[]
          }
          create: {
            args: Prisma.ExperimentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentPayload>
          }
          createMany: {
            args: Prisma.ExperimentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ExperimentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentPayload>
          }
          update: {
            args: Prisma.ExperimentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentPayload>
          }
          deleteMany: {
            args: Prisma.ExperimentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExperimentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExperimentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentPayload>
          }
          aggregate: {
            args: Prisma.ExperimentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExperiment>
          }
          groupBy: {
            args: Prisma.ExperimentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExperimentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExperimentCountArgs<ExtArgs>
            result: $Utils.Optional<ExperimentCountAggregateOutputType> | number
          }
        }
      }
      EvaluationResult: {
        payload: Prisma.$EvaluationResultPayload<ExtArgs>
        fields: Prisma.EvaluationResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EvaluationResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EvaluationResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationResultPayload>
          }
          findFirst: {
            args: Prisma.EvaluationResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EvaluationResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationResultPayload>
          }
          findMany: {
            args: Prisma.EvaluationResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationResultPayload>[]
          }
          create: {
            args: Prisma.EvaluationResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationResultPayload>
          }
          createMany: {
            args: Prisma.EvaluationResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EvaluationResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationResultPayload>
          }
          update: {
            args: Prisma.EvaluationResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationResultPayload>
          }
          deleteMany: {
            args: Prisma.EvaluationResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EvaluationResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EvaluationResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationResultPayload>
          }
          aggregate: {
            args: Prisma.EvaluationResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvaluationResult>
          }
          groupBy: {
            args: Prisma.EvaluationResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<EvaluationResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.EvaluationResultCountArgs<ExtArgs>
            result: $Utils.Optional<EvaluationResultCountAggregateOutputType> | number
          }
        }
      }
      GithubIntegration: {
        payload: Prisma.$GithubIntegrationPayload<ExtArgs>
        fields: Prisma.GithubIntegrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GithubIntegrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubIntegrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GithubIntegrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubIntegrationPayload>
          }
          findFirst: {
            args: Prisma.GithubIntegrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubIntegrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GithubIntegrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubIntegrationPayload>
          }
          findMany: {
            args: Prisma.GithubIntegrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubIntegrationPayload>[]
          }
          create: {
            args: Prisma.GithubIntegrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubIntegrationPayload>
          }
          createMany: {
            args: Prisma.GithubIntegrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.GithubIntegrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubIntegrationPayload>
          }
          update: {
            args: Prisma.GithubIntegrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubIntegrationPayload>
          }
          deleteMany: {
            args: Prisma.GithubIntegrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GithubIntegrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GithubIntegrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubIntegrationPayload>
          }
          aggregate: {
            args: Prisma.GithubIntegrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGithubIntegration>
          }
          groupBy: {
            args: Prisma.GithubIntegrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<GithubIntegrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.GithubIntegrationCountArgs<ExtArgs>
            result: $Utils.Optional<GithubIntegrationCountAggregateOutputType> | number
          }
        }
      }
      Baseline: {
        payload: Prisma.$BaselinePayload<ExtArgs>
        fields: Prisma.BaselineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BaselineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BaselinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BaselineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BaselinePayload>
          }
          findFirst: {
            args: Prisma.BaselineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BaselinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BaselineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BaselinePayload>
          }
          findMany: {
            args: Prisma.BaselineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BaselinePayload>[]
          }
          create: {
            args: Prisma.BaselineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BaselinePayload>
          }
          createMany: {
            args: Prisma.BaselineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BaselineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BaselinePayload>
          }
          update: {
            args: Prisma.BaselineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BaselinePayload>
          }
          deleteMany: {
            args: Prisma.BaselineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BaselineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BaselineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BaselinePayload>
          }
          aggregate: {
            args: Prisma.BaselineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBaseline>
          }
          groupBy: {
            args: Prisma.BaselineGroupByArgs<ExtArgs>
            result: $Utils.Optional<BaselineGroupByOutputType>[]
          }
          count: {
            args: Prisma.BaselineCountArgs<ExtArgs>
            result: $Utils.Optional<BaselineCountAggregateOutputType> | number
          }
        }
      }
      ProjectCiToken: {
        payload: Prisma.$ProjectCiTokenPayload<ExtArgs>
        fields: Prisma.ProjectCiTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectCiTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectCiTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectCiTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectCiTokenPayload>
          }
          findFirst: {
            args: Prisma.ProjectCiTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectCiTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectCiTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectCiTokenPayload>
          }
          findMany: {
            args: Prisma.ProjectCiTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectCiTokenPayload>[]
          }
          create: {
            args: Prisma.ProjectCiTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectCiTokenPayload>
          }
          createMany: {
            args: Prisma.ProjectCiTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProjectCiTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectCiTokenPayload>
          }
          update: {
            args: Prisma.ProjectCiTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectCiTokenPayload>
          }
          deleteMany: {
            args: Prisma.ProjectCiTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectCiTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProjectCiTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectCiTokenPayload>
          }
          aggregate: {
            args: Prisma.ProjectCiTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectCiToken>
          }
          groupBy: {
            args: Prisma.ProjectCiTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectCiTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCiTokenCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCiTokenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    project?: ProjectOmit
    dataset?: DatasetOmit
    testCase?: TestCaseOmit
    evaluator?: EvaluatorOmit
    experiment?: ExperimentOmit
    evaluationResult?: EvaluationResultOmit
    githubIntegration?: GithubIntegrationOmit
    baseline?: BaselineOmit
    projectCiToken?: ProjectCiTokenOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    projects: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    datasets: number
    evaluators: number
    experiments: number
    githubIntegrations: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    datasets?: boolean | ProjectCountOutputTypeCountDatasetsArgs
    evaluators?: boolean | ProjectCountOutputTypeCountEvaluatorsArgs
    experiments?: boolean | ProjectCountOutputTypeCountExperimentsArgs
    githubIntegrations?: boolean | ProjectCountOutputTypeCountGithubIntegrationsArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountDatasetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DatasetWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountEvaluatorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluatorWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountExperimentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExperimentWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountGithubIntegrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GithubIntegrationWhereInput
  }


  /**
   * Count Type DatasetCountOutputType
   */

  export type DatasetCountOutputType = {
    experiments: number
    testCases: number
  }

  export type DatasetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    experiments?: boolean | DatasetCountOutputTypeCountExperimentsArgs
    testCases?: boolean | DatasetCountOutputTypeCountTestCasesArgs
  }

  // Custom InputTypes
  /**
   * DatasetCountOutputType without action
   */
  export type DatasetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DatasetCountOutputType
     */
    select?: DatasetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DatasetCountOutputType without action
   */
  export type DatasetCountOutputTypeCountExperimentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExperimentWhereInput
  }

  /**
   * DatasetCountOutputType without action
   */
  export type DatasetCountOutputTypeCountTestCasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestCaseWhereInput
  }


  /**
   * Count Type TestCaseCountOutputType
   */

  export type TestCaseCountOutputType = {
    results: number
  }

  export type TestCaseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    results?: boolean | TestCaseCountOutputTypeCountResultsArgs
  }

  // Custom InputTypes
  /**
   * TestCaseCountOutputType without action
   */
  export type TestCaseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCaseCountOutputType
     */
    select?: TestCaseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TestCaseCountOutputType without action
   */
  export type TestCaseCountOutputTypeCountResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluationResultWhereInput
  }


  /**
   * Count Type ExperimentCountOutputType
   */

  export type ExperimentCountOutputType = {
    results: number
  }

  export type ExperimentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    results?: boolean | ExperimentCountOutputTypeCountResultsArgs
  }

  // Custom InputTypes
  /**
   * ExperimentCountOutputType without action
   */
  export type ExperimentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentCountOutputType
     */
    select?: ExperimentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExperimentCountOutputType without action
   */
  export type ExperimentCountOutputTypeCountResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluationResultWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    passwordHash: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projects?: boolean | User$projectsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "passwordHash" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | User$projectsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      projects: Prisma.$ProjectPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      passwordHash: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    temperature: number | null
    topP: number | null
    maxTokens: number | null
    inputCostPerMillion: number | null
    cachedInputCostPerMillion: number | null
    outputCostPerMillion: number | null
    allowedQualityDrop: number | null
    cacheTtlSeconds: number | null
  }

  export type ProjectSumAggregateOutputType = {
    temperature: number | null
    topP: number | null
    maxTokens: number | null
    inputCostPerMillion: number | null
    cachedInputCostPerMillion: number | null
    outputCostPerMillion: number | null
    allowedQualityDrop: number | null
    cacheTtlSeconds: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    model: string | null
    systemPrompt: string | null
    temperature: number | null
    topP: number | null
    maxTokens: number | null
    inputCostPerMillion: number | null
    cachedInputCostPerMillion: number | null
    outputCostPerMillion: number | null
    allowedQualityDrop: number | null
    cacheEnabled: boolean | null
    cacheTtlSeconds: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    model: string | null
    systemPrompt: string | null
    temperature: number | null
    topP: number | null
    maxTokens: number | null
    inputCostPerMillion: number | null
    cachedInputCostPerMillion: number | null
    outputCostPerMillion: number | null
    allowedQualityDrop: number | null
    cacheEnabled: boolean | null
    cacheTtlSeconds: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    description: number
    model: number
    systemPrompt: number
    temperature: number
    topP: number
    maxTokens: number
    inputCostPerMillion: number
    cachedInputCostPerMillion: number
    outputCostPerMillion: number
    allowedQualityDrop: number
    cacheEnabled: number
    cacheTtlSeconds: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    temperature?: true
    topP?: true
    maxTokens?: true
    inputCostPerMillion?: true
    cachedInputCostPerMillion?: true
    outputCostPerMillion?: true
    allowedQualityDrop?: true
    cacheTtlSeconds?: true
  }

  export type ProjectSumAggregateInputType = {
    temperature?: true
    topP?: true
    maxTokens?: true
    inputCostPerMillion?: true
    cachedInputCostPerMillion?: true
    outputCostPerMillion?: true
    allowedQualityDrop?: true
    cacheTtlSeconds?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    model?: true
    systemPrompt?: true
    temperature?: true
    topP?: true
    maxTokens?: true
    inputCostPerMillion?: true
    cachedInputCostPerMillion?: true
    outputCostPerMillion?: true
    allowedQualityDrop?: true
    cacheEnabled?: true
    cacheTtlSeconds?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    model?: true
    systemPrompt?: true
    temperature?: true
    topP?: true
    maxTokens?: true
    inputCostPerMillion?: true
    cachedInputCostPerMillion?: true
    outputCostPerMillion?: true
    allowedQualityDrop?: true
    cacheEnabled?: true
    cacheTtlSeconds?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    model?: true
    systemPrompt?: true
    temperature?: true
    topP?: true
    maxTokens?: true
    inputCostPerMillion?: true
    cachedInputCostPerMillion?: true
    outputCostPerMillion?: true
    allowedQualityDrop?: true
    cacheEnabled?: true
    cacheTtlSeconds?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    userId: string
    name: string
    description: string | null
    model: string
    systemPrompt: string | null
    temperature: number | null
    topP: number | null
    maxTokens: number | null
    inputCostPerMillion: number
    cachedInputCostPerMillion: number
    outputCostPerMillion: number
    allowedQualityDrop: number
    cacheEnabled: boolean
    cacheTtlSeconds: number
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    model?: boolean
    systemPrompt?: boolean
    temperature?: boolean
    topP?: boolean
    maxTokens?: boolean
    inputCostPerMillion?: boolean
    cachedInputCostPerMillion?: boolean
    outputCostPerMillion?: boolean
    allowedQualityDrop?: boolean
    cacheEnabled?: boolean
    cacheTtlSeconds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baseline?: boolean | Project$baselineArgs<ExtArgs>
    datasets?: boolean | Project$datasetsArgs<ExtArgs>
    evaluators?: boolean | Project$evaluatorsArgs<ExtArgs>
    experiments?: boolean | Project$experimentsArgs<ExtArgs>
    githubIntegrations?: boolean | Project$githubIntegrationsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    ciToken?: boolean | Project$ciTokenArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>



  export type ProjectSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    model?: boolean
    systemPrompt?: boolean
    temperature?: boolean
    topP?: boolean
    maxTokens?: boolean
    inputCostPerMillion?: boolean
    cachedInputCostPerMillion?: boolean
    outputCostPerMillion?: boolean
    allowedQualityDrop?: boolean
    cacheEnabled?: boolean
    cacheTtlSeconds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "description" | "model" | "systemPrompt" | "temperature" | "topP" | "maxTokens" | "inputCostPerMillion" | "cachedInputCostPerMillion" | "outputCostPerMillion" | "allowedQualityDrop" | "cacheEnabled" | "cacheTtlSeconds" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baseline?: boolean | Project$baselineArgs<ExtArgs>
    datasets?: boolean | Project$datasetsArgs<ExtArgs>
    evaluators?: boolean | Project$evaluatorsArgs<ExtArgs>
    experiments?: boolean | Project$experimentsArgs<ExtArgs>
    githubIntegrations?: boolean | Project$githubIntegrationsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    ciToken?: boolean | Project$ciTokenArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      baseline: Prisma.$BaselinePayload<ExtArgs> | null
      datasets: Prisma.$DatasetPayload<ExtArgs>[]
      evaluators: Prisma.$EvaluatorPayload<ExtArgs>[]
      experiments: Prisma.$ExperimentPayload<ExtArgs>[]
      githubIntegrations: Prisma.$GithubIntegrationPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
      ciToken: Prisma.$ProjectCiTokenPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      description: string | null
      model: string
      systemPrompt: string | null
      temperature: number | null
      topP: number | null
      maxTokens: number | null
      inputCostPerMillion: number
      cachedInputCostPerMillion: number
      outputCostPerMillion: number
      allowedQualityDrop: number
      cacheEnabled: boolean
      cacheTtlSeconds: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    baseline<T extends Project$baselineArgs<ExtArgs> = {}>(args?: Subset<T, Project$baselineArgs<ExtArgs>>): Prisma__BaselineClient<$Result.GetResult<Prisma.$BaselinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    datasets<T extends Project$datasetsArgs<ExtArgs> = {}>(args?: Subset<T, Project$datasetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    evaluators<T extends Project$evaluatorsArgs<ExtArgs> = {}>(args?: Subset<T, Project$evaluatorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluatorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    experiments<T extends Project$experimentsArgs<ExtArgs> = {}>(args?: Subset<T, Project$experimentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    githubIntegrations<T extends Project$githubIntegrationsArgs<ExtArgs> = {}>(args?: Subset<T, Project$githubIntegrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    ciToken<T extends Project$ciTokenArgs<ExtArgs> = {}>(args?: Subset<T, Project$ciTokenArgs<ExtArgs>>): Prisma__ProjectCiTokenClient<$Result.GetResult<Prisma.$ProjectCiTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly userId: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly model: FieldRef<"Project", 'String'>
    readonly systemPrompt: FieldRef<"Project", 'String'>
    readonly temperature: FieldRef<"Project", 'Float'>
    readonly topP: FieldRef<"Project", 'Float'>
    readonly maxTokens: FieldRef<"Project", 'Int'>
    readonly inputCostPerMillion: FieldRef<"Project", 'Float'>
    readonly cachedInputCostPerMillion: FieldRef<"Project", 'Float'>
    readonly outputCostPerMillion: FieldRef<"Project", 'Float'>
    readonly allowedQualityDrop: FieldRef<"Project", 'Float'>
    readonly cacheEnabled: FieldRef<"Project", 'Boolean'>
    readonly cacheTtlSeconds: FieldRef<"Project", 'Int'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.baseline
   */
  export type Project$baselineArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baseline
     */
    select?: BaselineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baseline
     */
    omit?: BaselineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaselineInclude<ExtArgs> | null
    where?: BaselineWhereInput
  }

  /**
   * Project.datasets
   */
  export type Project$datasetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    where?: DatasetWhereInput
    orderBy?: DatasetOrderByWithRelationInput | DatasetOrderByWithRelationInput[]
    cursor?: DatasetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DatasetScalarFieldEnum | DatasetScalarFieldEnum[]
  }

  /**
   * Project.evaluators
   */
  export type Project$evaluatorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluator
     */
    select?: EvaluatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluator
     */
    omit?: EvaluatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluatorInclude<ExtArgs> | null
    where?: EvaluatorWhereInput
    orderBy?: EvaluatorOrderByWithRelationInput | EvaluatorOrderByWithRelationInput[]
    cursor?: EvaluatorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EvaluatorScalarFieldEnum | EvaluatorScalarFieldEnum[]
  }

  /**
   * Project.experiments
   */
  export type Project$experimentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
    where?: ExperimentWhereInput
    orderBy?: ExperimentOrderByWithRelationInput | ExperimentOrderByWithRelationInput[]
    cursor?: ExperimentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExperimentScalarFieldEnum | ExperimentScalarFieldEnum[]
  }

  /**
   * Project.githubIntegrations
   */
  export type Project$githubIntegrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
    where?: GithubIntegrationWhereInput
    orderBy?: GithubIntegrationOrderByWithRelationInput | GithubIntegrationOrderByWithRelationInput[]
    cursor?: GithubIntegrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GithubIntegrationScalarFieldEnum | GithubIntegrationScalarFieldEnum[]
  }

  /**
   * Project.ciToken
   */
  export type Project$ciTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCiToken
     */
    select?: ProjectCiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectCiToken
     */
    omit?: ProjectCiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectCiTokenInclude<ExtArgs> | null
    where?: ProjectCiTokenWhereInput
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model Dataset
   */

  export type AggregateDataset = {
    _count: DatasetCountAggregateOutputType | null
    _avg: DatasetAvgAggregateOutputType | null
    _sum: DatasetSumAggregateOutputType | null
    _min: DatasetMinAggregateOutputType | null
    _max: DatasetMaxAggregateOutputType | null
  }

  export type DatasetAvgAggregateOutputType = {
    version: number | null
  }

  export type DatasetSumAggregateOutputType = {
    version: number | null
  }

  export type DatasetMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    name: string | null
    description: string | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DatasetMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    name: string | null
    description: string | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DatasetCountAggregateOutputType = {
    id: number
    projectId: number
    name: number
    description: number
    version: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DatasetAvgAggregateInputType = {
    version?: true
  }

  export type DatasetSumAggregateInputType = {
    version?: true
  }

  export type DatasetMinAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    description?: true
    version?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DatasetMaxAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    description?: true
    version?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DatasetCountAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    description?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DatasetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dataset to aggregate.
     */
    where?: DatasetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Datasets to fetch.
     */
    orderBy?: DatasetOrderByWithRelationInput | DatasetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DatasetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Datasets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Datasets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Datasets
    **/
    _count?: true | DatasetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DatasetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DatasetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DatasetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DatasetMaxAggregateInputType
  }

  export type GetDatasetAggregateType<T extends DatasetAggregateArgs> = {
        [P in keyof T & keyof AggregateDataset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDataset[P]>
      : GetScalarType<T[P], AggregateDataset[P]>
  }




  export type DatasetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DatasetWhereInput
    orderBy?: DatasetOrderByWithAggregationInput | DatasetOrderByWithAggregationInput[]
    by: DatasetScalarFieldEnum[] | DatasetScalarFieldEnum
    having?: DatasetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DatasetCountAggregateInputType | true
    _avg?: DatasetAvgAggregateInputType
    _sum?: DatasetSumAggregateInputType
    _min?: DatasetMinAggregateInputType
    _max?: DatasetMaxAggregateInputType
  }

  export type DatasetGroupByOutputType = {
    id: string
    projectId: string
    name: string
    description: string | null
    version: number
    createdAt: Date
    updatedAt: Date
    _count: DatasetCountAggregateOutputType | null
    _avg: DatasetAvgAggregateOutputType | null
    _sum: DatasetSumAggregateOutputType | null
    _min: DatasetMinAggregateOutputType | null
    _max: DatasetMaxAggregateOutputType | null
  }

  type GetDatasetGroupByPayload<T extends DatasetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DatasetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DatasetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DatasetGroupByOutputType[P]>
            : GetScalarType<T[P], DatasetGroupByOutputType[P]>
        }
      >
    >


  export type DatasetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    description?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    experiments?: boolean | Dataset$experimentsArgs<ExtArgs>
    testCases?: boolean | Dataset$testCasesArgs<ExtArgs>
    _count?: boolean | DatasetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dataset"]>



  export type DatasetSelectScalar = {
    id?: boolean
    projectId?: boolean
    name?: boolean
    description?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DatasetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "name" | "description" | "version" | "createdAt" | "updatedAt", ExtArgs["result"]["dataset"]>
  export type DatasetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    experiments?: boolean | Dataset$experimentsArgs<ExtArgs>
    testCases?: boolean | Dataset$testCasesArgs<ExtArgs>
    _count?: boolean | DatasetCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $DatasetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Dataset"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      experiments: Prisma.$ExperimentPayload<ExtArgs>[]
      testCases: Prisma.$TestCasePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      name: string
      description: string | null
      version: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dataset"]>
    composites: {}
  }

  type DatasetGetPayload<S extends boolean | null | undefined | DatasetDefaultArgs> = $Result.GetResult<Prisma.$DatasetPayload, S>

  type DatasetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DatasetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DatasetCountAggregateInputType | true
    }

  export interface DatasetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Dataset'], meta: { name: 'Dataset' } }
    /**
     * Find zero or one Dataset that matches the filter.
     * @param {DatasetFindUniqueArgs} args - Arguments to find a Dataset
     * @example
     * // Get one Dataset
     * const dataset = await prisma.dataset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DatasetFindUniqueArgs>(args: SelectSubset<T, DatasetFindUniqueArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Dataset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DatasetFindUniqueOrThrowArgs} args - Arguments to find a Dataset
     * @example
     * // Get one Dataset
     * const dataset = await prisma.dataset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DatasetFindUniqueOrThrowArgs>(args: SelectSubset<T, DatasetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dataset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetFindFirstArgs} args - Arguments to find a Dataset
     * @example
     * // Get one Dataset
     * const dataset = await prisma.dataset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DatasetFindFirstArgs>(args?: SelectSubset<T, DatasetFindFirstArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dataset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetFindFirstOrThrowArgs} args - Arguments to find a Dataset
     * @example
     * // Get one Dataset
     * const dataset = await prisma.dataset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DatasetFindFirstOrThrowArgs>(args?: SelectSubset<T, DatasetFindFirstOrThrowArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Datasets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Datasets
     * const datasets = await prisma.dataset.findMany()
     * 
     * // Get first 10 Datasets
     * const datasets = await prisma.dataset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const datasetWithIdOnly = await prisma.dataset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DatasetFindManyArgs>(args?: SelectSubset<T, DatasetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Dataset.
     * @param {DatasetCreateArgs} args - Arguments to create a Dataset.
     * @example
     * // Create one Dataset
     * const Dataset = await prisma.dataset.create({
     *   data: {
     *     // ... data to create a Dataset
     *   }
     * })
     * 
     */
    create<T extends DatasetCreateArgs>(args: SelectSubset<T, DatasetCreateArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Datasets.
     * @param {DatasetCreateManyArgs} args - Arguments to create many Datasets.
     * @example
     * // Create many Datasets
     * const dataset = await prisma.dataset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DatasetCreateManyArgs>(args?: SelectSubset<T, DatasetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Dataset.
     * @param {DatasetDeleteArgs} args - Arguments to delete one Dataset.
     * @example
     * // Delete one Dataset
     * const Dataset = await prisma.dataset.delete({
     *   where: {
     *     // ... filter to delete one Dataset
     *   }
     * })
     * 
     */
    delete<T extends DatasetDeleteArgs>(args: SelectSubset<T, DatasetDeleteArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Dataset.
     * @param {DatasetUpdateArgs} args - Arguments to update one Dataset.
     * @example
     * // Update one Dataset
     * const dataset = await prisma.dataset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DatasetUpdateArgs>(args: SelectSubset<T, DatasetUpdateArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Datasets.
     * @param {DatasetDeleteManyArgs} args - Arguments to filter Datasets to delete.
     * @example
     * // Delete a few Datasets
     * const { count } = await prisma.dataset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DatasetDeleteManyArgs>(args?: SelectSubset<T, DatasetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Datasets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Datasets
     * const dataset = await prisma.dataset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DatasetUpdateManyArgs>(args: SelectSubset<T, DatasetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Dataset.
     * @param {DatasetUpsertArgs} args - Arguments to update or create a Dataset.
     * @example
     * // Update or create a Dataset
     * const dataset = await prisma.dataset.upsert({
     *   create: {
     *     // ... data to create a Dataset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dataset we want to update
     *   }
     * })
     */
    upsert<T extends DatasetUpsertArgs>(args: SelectSubset<T, DatasetUpsertArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Datasets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetCountArgs} args - Arguments to filter Datasets to count.
     * @example
     * // Count the number of Datasets
     * const count = await prisma.dataset.count({
     *   where: {
     *     // ... the filter for the Datasets we want to count
     *   }
     * })
    **/
    count<T extends DatasetCountArgs>(
      args?: Subset<T, DatasetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DatasetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dataset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DatasetAggregateArgs>(args: Subset<T, DatasetAggregateArgs>): Prisma.PrismaPromise<GetDatasetAggregateType<T>>

    /**
     * Group by Dataset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DatasetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DatasetGroupByArgs['orderBy'] }
        : { orderBy?: DatasetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DatasetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDatasetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Dataset model
   */
  readonly fields: DatasetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Dataset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DatasetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    experiments<T extends Dataset$experimentsArgs<ExtArgs> = {}>(args?: Subset<T, Dataset$experimentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    testCases<T extends Dataset$testCasesArgs<ExtArgs> = {}>(args?: Subset<T, Dataset$testCasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Dataset model
   */
  interface DatasetFieldRefs {
    readonly id: FieldRef<"Dataset", 'String'>
    readonly projectId: FieldRef<"Dataset", 'String'>
    readonly name: FieldRef<"Dataset", 'String'>
    readonly description: FieldRef<"Dataset", 'String'>
    readonly version: FieldRef<"Dataset", 'Int'>
    readonly createdAt: FieldRef<"Dataset", 'DateTime'>
    readonly updatedAt: FieldRef<"Dataset", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Dataset findUnique
   */
  export type DatasetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * Filter, which Dataset to fetch.
     */
    where: DatasetWhereUniqueInput
  }

  /**
   * Dataset findUniqueOrThrow
   */
  export type DatasetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * Filter, which Dataset to fetch.
     */
    where: DatasetWhereUniqueInput
  }

  /**
   * Dataset findFirst
   */
  export type DatasetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * Filter, which Dataset to fetch.
     */
    where?: DatasetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Datasets to fetch.
     */
    orderBy?: DatasetOrderByWithRelationInput | DatasetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Datasets.
     */
    cursor?: DatasetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Datasets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Datasets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Datasets.
     */
    distinct?: DatasetScalarFieldEnum | DatasetScalarFieldEnum[]
  }

  /**
   * Dataset findFirstOrThrow
   */
  export type DatasetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * Filter, which Dataset to fetch.
     */
    where?: DatasetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Datasets to fetch.
     */
    orderBy?: DatasetOrderByWithRelationInput | DatasetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Datasets.
     */
    cursor?: DatasetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Datasets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Datasets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Datasets.
     */
    distinct?: DatasetScalarFieldEnum | DatasetScalarFieldEnum[]
  }

  /**
   * Dataset findMany
   */
  export type DatasetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * Filter, which Datasets to fetch.
     */
    where?: DatasetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Datasets to fetch.
     */
    orderBy?: DatasetOrderByWithRelationInput | DatasetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Datasets.
     */
    cursor?: DatasetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Datasets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Datasets.
     */
    skip?: number
    distinct?: DatasetScalarFieldEnum | DatasetScalarFieldEnum[]
  }

  /**
   * Dataset create
   */
  export type DatasetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * The data needed to create a Dataset.
     */
    data: XOR<DatasetCreateInput, DatasetUncheckedCreateInput>
  }

  /**
   * Dataset createMany
   */
  export type DatasetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Datasets.
     */
    data: DatasetCreateManyInput | DatasetCreateManyInput[]
  }

  /**
   * Dataset update
   */
  export type DatasetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * The data needed to update a Dataset.
     */
    data: XOR<DatasetUpdateInput, DatasetUncheckedUpdateInput>
    /**
     * Choose, which Dataset to update.
     */
    where: DatasetWhereUniqueInput
  }

  /**
   * Dataset updateMany
   */
  export type DatasetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Datasets.
     */
    data: XOR<DatasetUpdateManyMutationInput, DatasetUncheckedUpdateManyInput>
    /**
     * Filter which Datasets to update
     */
    where?: DatasetWhereInput
    /**
     * Limit how many Datasets to update.
     */
    limit?: number
  }

  /**
   * Dataset upsert
   */
  export type DatasetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * The filter to search for the Dataset to update in case it exists.
     */
    where: DatasetWhereUniqueInput
    /**
     * In case the Dataset found by the `where` argument doesn't exist, create a new Dataset with this data.
     */
    create: XOR<DatasetCreateInput, DatasetUncheckedCreateInput>
    /**
     * In case the Dataset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DatasetUpdateInput, DatasetUncheckedUpdateInput>
  }

  /**
   * Dataset delete
   */
  export type DatasetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * Filter which Dataset to delete.
     */
    where: DatasetWhereUniqueInput
  }

  /**
   * Dataset deleteMany
   */
  export type DatasetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Datasets to delete
     */
    where?: DatasetWhereInput
    /**
     * Limit how many Datasets to delete.
     */
    limit?: number
  }

  /**
   * Dataset.experiments
   */
  export type Dataset$experimentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
    where?: ExperimentWhereInput
    orderBy?: ExperimentOrderByWithRelationInput | ExperimentOrderByWithRelationInput[]
    cursor?: ExperimentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExperimentScalarFieldEnum | ExperimentScalarFieldEnum[]
  }

  /**
   * Dataset.testCases
   */
  export type Dataset$testCasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    where?: TestCaseWhereInput
    orderBy?: TestCaseOrderByWithRelationInput | TestCaseOrderByWithRelationInput[]
    cursor?: TestCaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestCaseScalarFieldEnum | TestCaseScalarFieldEnum[]
  }

  /**
   * Dataset without action
   */
  export type DatasetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
  }


  /**
   * Model TestCase
   */

  export type AggregateTestCase = {
    _count: TestCaseCountAggregateOutputType | null
    _min: TestCaseMinAggregateOutputType | null
    _max: TestCaseMaxAggregateOutputType | null
  }

  export type TestCaseMinAggregateOutputType = {
    id: string | null
    datasetId: string | null
    input: string | null
    expectedOutput: string | null
    metadata: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TestCaseMaxAggregateOutputType = {
    id: string | null
    datasetId: string | null
    input: string | null
    expectedOutput: string | null
    metadata: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TestCaseCountAggregateOutputType = {
    id: number
    datasetId: number
    input: number
    expectedOutput: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TestCaseMinAggregateInputType = {
    id?: true
    datasetId?: true
    input?: true
    expectedOutput?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TestCaseMaxAggregateInputType = {
    id?: true
    datasetId?: true
    input?: true
    expectedOutput?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TestCaseCountAggregateInputType = {
    id?: true
    datasetId?: true
    input?: true
    expectedOutput?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TestCaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestCase to aggregate.
     */
    where?: TestCaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestCases to fetch.
     */
    orderBy?: TestCaseOrderByWithRelationInput | TestCaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestCaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestCases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestCases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TestCases
    **/
    _count?: true | TestCaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestCaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestCaseMaxAggregateInputType
  }

  export type GetTestCaseAggregateType<T extends TestCaseAggregateArgs> = {
        [P in keyof T & keyof AggregateTestCase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestCase[P]>
      : GetScalarType<T[P], AggregateTestCase[P]>
  }




  export type TestCaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestCaseWhereInput
    orderBy?: TestCaseOrderByWithAggregationInput | TestCaseOrderByWithAggregationInput[]
    by: TestCaseScalarFieldEnum[] | TestCaseScalarFieldEnum
    having?: TestCaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestCaseCountAggregateInputType | true
    _min?: TestCaseMinAggregateInputType
    _max?: TestCaseMaxAggregateInputType
  }

  export type TestCaseGroupByOutputType = {
    id: string
    datasetId: string
    input: string
    expectedOutput: string | null
    metadata: string | null
    createdAt: Date
    updatedAt: Date
    _count: TestCaseCountAggregateOutputType | null
    _min: TestCaseMinAggregateOutputType | null
    _max: TestCaseMaxAggregateOutputType | null
  }

  type GetTestCaseGroupByPayload<T extends TestCaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestCaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestCaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestCaseGroupByOutputType[P]>
            : GetScalarType<T[P], TestCaseGroupByOutputType[P]>
        }
      >
    >


  export type TestCaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    datasetId?: boolean
    input?: boolean
    expectedOutput?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    results?: boolean | TestCase$resultsArgs<ExtArgs>
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
    _count?: boolean | TestCaseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testCase"]>



  export type TestCaseSelectScalar = {
    id?: boolean
    datasetId?: boolean
    input?: boolean
    expectedOutput?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TestCaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "datasetId" | "input" | "expectedOutput" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["testCase"]>
  export type TestCaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    results?: boolean | TestCase$resultsArgs<ExtArgs>
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
    _count?: boolean | TestCaseCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TestCasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TestCase"
    objects: {
      results: Prisma.$EvaluationResultPayload<ExtArgs>[]
      dataset: Prisma.$DatasetPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      datasetId: string
      input: string
      expectedOutput: string | null
      metadata: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["testCase"]>
    composites: {}
  }

  type TestCaseGetPayload<S extends boolean | null | undefined | TestCaseDefaultArgs> = $Result.GetResult<Prisma.$TestCasePayload, S>

  type TestCaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestCaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestCaseCountAggregateInputType | true
    }

  export interface TestCaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TestCase'], meta: { name: 'TestCase' } }
    /**
     * Find zero or one TestCase that matches the filter.
     * @param {TestCaseFindUniqueArgs} args - Arguments to find a TestCase
     * @example
     * // Get one TestCase
     * const testCase = await prisma.testCase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestCaseFindUniqueArgs>(args: SelectSubset<T, TestCaseFindUniqueArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TestCase that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestCaseFindUniqueOrThrowArgs} args - Arguments to find a TestCase
     * @example
     * // Get one TestCase
     * const testCase = await prisma.testCase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestCaseFindUniqueOrThrowArgs>(args: SelectSubset<T, TestCaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestCase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseFindFirstArgs} args - Arguments to find a TestCase
     * @example
     * // Get one TestCase
     * const testCase = await prisma.testCase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestCaseFindFirstArgs>(args?: SelectSubset<T, TestCaseFindFirstArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestCase that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseFindFirstOrThrowArgs} args - Arguments to find a TestCase
     * @example
     * // Get one TestCase
     * const testCase = await prisma.testCase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestCaseFindFirstOrThrowArgs>(args?: SelectSubset<T, TestCaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TestCases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TestCases
     * const testCases = await prisma.testCase.findMany()
     * 
     * // Get first 10 TestCases
     * const testCases = await prisma.testCase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testCaseWithIdOnly = await prisma.testCase.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestCaseFindManyArgs>(args?: SelectSubset<T, TestCaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TestCase.
     * @param {TestCaseCreateArgs} args - Arguments to create a TestCase.
     * @example
     * // Create one TestCase
     * const TestCase = await prisma.testCase.create({
     *   data: {
     *     // ... data to create a TestCase
     *   }
     * })
     * 
     */
    create<T extends TestCaseCreateArgs>(args: SelectSubset<T, TestCaseCreateArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TestCases.
     * @param {TestCaseCreateManyArgs} args - Arguments to create many TestCases.
     * @example
     * // Create many TestCases
     * const testCase = await prisma.testCase.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestCaseCreateManyArgs>(args?: SelectSubset<T, TestCaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TestCase.
     * @param {TestCaseDeleteArgs} args - Arguments to delete one TestCase.
     * @example
     * // Delete one TestCase
     * const TestCase = await prisma.testCase.delete({
     *   where: {
     *     // ... filter to delete one TestCase
     *   }
     * })
     * 
     */
    delete<T extends TestCaseDeleteArgs>(args: SelectSubset<T, TestCaseDeleteArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TestCase.
     * @param {TestCaseUpdateArgs} args - Arguments to update one TestCase.
     * @example
     * // Update one TestCase
     * const testCase = await prisma.testCase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestCaseUpdateArgs>(args: SelectSubset<T, TestCaseUpdateArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TestCases.
     * @param {TestCaseDeleteManyArgs} args - Arguments to filter TestCases to delete.
     * @example
     * // Delete a few TestCases
     * const { count } = await prisma.testCase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestCaseDeleteManyArgs>(args?: SelectSubset<T, TestCaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestCases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TestCases
     * const testCase = await prisma.testCase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestCaseUpdateManyArgs>(args: SelectSubset<T, TestCaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TestCase.
     * @param {TestCaseUpsertArgs} args - Arguments to update or create a TestCase.
     * @example
     * // Update or create a TestCase
     * const testCase = await prisma.testCase.upsert({
     *   create: {
     *     // ... data to create a TestCase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TestCase we want to update
     *   }
     * })
     */
    upsert<T extends TestCaseUpsertArgs>(args: SelectSubset<T, TestCaseUpsertArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TestCases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseCountArgs} args - Arguments to filter TestCases to count.
     * @example
     * // Count the number of TestCases
     * const count = await prisma.testCase.count({
     *   where: {
     *     // ... the filter for the TestCases we want to count
     *   }
     * })
    **/
    count<T extends TestCaseCountArgs>(
      args?: Subset<T, TestCaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestCaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TestCase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestCaseAggregateArgs>(args: Subset<T, TestCaseAggregateArgs>): Prisma.PrismaPromise<GetTestCaseAggregateType<T>>

    /**
     * Group by TestCase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestCaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestCaseGroupByArgs['orderBy'] }
        : { orderBy?: TestCaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestCaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestCaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TestCase model
   */
  readonly fields: TestCaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TestCase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestCaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    results<T extends TestCase$resultsArgs<ExtArgs> = {}>(args?: Subset<T, TestCase$resultsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dataset<T extends DatasetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DatasetDefaultArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TestCase model
   */
  interface TestCaseFieldRefs {
    readonly id: FieldRef<"TestCase", 'String'>
    readonly datasetId: FieldRef<"TestCase", 'String'>
    readonly input: FieldRef<"TestCase", 'String'>
    readonly expectedOutput: FieldRef<"TestCase", 'String'>
    readonly metadata: FieldRef<"TestCase", 'String'>
    readonly createdAt: FieldRef<"TestCase", 'DateTime'>
    readonly updatedAt: FieldRef<"TestCase", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TestCase findUnique
   */
  export type TestCaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * Filter, which TestCase to fetch.
     */
    where: TestCaseWhereUniqueInput
  }

  /**
   * TestCase findUniqueOrThrow
   */
  export type TestCaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * Filter, which TestCase to fetch.
     */
    where: TestCaseWhereUniqueInput
  }

  /**
   * TestCase findFirst
   */
  export type TestCaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * Filter, which TestCase to fetch.
     */
    where?: TestCaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestCases to fetch.
     */
    orderBy?: TestCaseOrderByWithRelationInput | TestCaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestCases.
     */
    cursor?: TestCaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestCases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestCases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestCases.
     */
    distinct?: TestCaseScalarFieldEnum | TestCaseScalarFieldEnum[]
  }

  /**
   * TestCase findFirstOrThrow
   */
  export type TestCaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * Filter, which TestCase to fetch.
     */
    where?: TestCaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestCases to fetch.
     */
    orderBy?: TestCaseOrderByWithRelationInput | TestCaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestCases.
     */
    cursor?: TestCaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestCases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestCases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestCases.
     */
    distinct?: TestCaseScalarFieldEnum | TestCaseScalarFieldEnum[]
  }

  /**
   * TestCase findMany
   */
  export type TestCaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * Filter, which TestCases to fetch.
     */
    where?: TestCaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestCases to fetch.
     */
    orderBy?: TestCaseOrderByWithRelationInput | TestCaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TestCases.
     */
    cursor?: TestCaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestCases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestCases.
     */
    skip?: number
    distinct?: TestCaseScalarFieldEnum | TestCaseScalarFieldEnum[]
  }

  /**
   * TestCase create
   */
  export type TestCaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * The data needed to create a TestCase.
     */
    data: XOR<TestCaseCreateInput, TestCaseUncheckedCreateInput>
  }

  /**
   * TestCase createMany
   */
  export type TestCaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TestCases.
     */
    data: TestCaseCreateManyInput | TestCaseCreateManyInput[]
  }

  /**
   * TestCase update
   */
  export type TestCaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * The data needed to update a TestCase.
     */
    data: XOR<TestCaseUpdateInput, TestCaseUncheckedUpdateInput>
    /**
     * Choose, which TestCase to update.
     */
    where: TestCaseWhereUniqueInput
  }

  /**
   * TestCase updateMany
   */
  export type TestCaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TestCases.
     */
    data: XOR<TestCaseUpdateManyMutationInput, TestCaseUncheckedUpdateManyInput>
    /**
     * Filter which TestCases to update
     */
    where?: TestCaseWhereInput
    /**
     * Limit how many TestCases to update.
     */
    limit?: number
  }

  /**
   * TestCase upsert
   */
  export type TestCaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * The filter to search for the TestCase to update in case it exists.
     */
    where: TestCaseWhereUniqueInput
    /**
     * In case the TestCase found by the `where` argument doesn't exist, create a new TestCase with this data.
     */
    create: XOR<TestCaseCreateInput, TestCaseUncheckedCreateInput>
    /**
     * In case the TestCase was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestCaseUpdateInput, TestCaseUncheckedUpdateInput>
  }

  /**
   * TestCase delete
   */
  export type TestCaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * Filter which TestCase to delete.
     */
    where: TestCaseWhereUniqueInput
  }

  /**
   * TestCase deleteMany
   */
  export type TestCaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestCases to delete
     */
    where?: TestCaseWhereInput
    /**
     * Limit how many TestCases to delete.
     */
    limit?: number
  }

  /**
   * TestCase.results
   */
  export type TestCase$resultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResult
     */
    select?: EvaluationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResult
     */
    omit?: EvaluationResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResultInclude<ExtArgs> | null
    where?: EvaluationResultWhereInput
    orderBy?: EvaluationResultOrderByWithRelationInput | EvaluationResultOrderByWithRelationInput[]
    cursor?: EvaluationResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EvaluationResultScalarFieldEnum | EvaluationResultScalarFieldEnum[]
  }

  /**
   * TestCase without action
   */
  export type TestCaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
  }


  /**
   * Model Evaluator
   */

  export type AggregateEvaluator = {
    _count: EvaluatorCountAggregateOutputType | null
    _min: EvaluatorMinAggregateOutputType | null
    _max: EvaluatorMaxAggregateOutputType | null
  }

  export type EvaluatorMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    name: string | null
    type: string | null
    config: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EvaluatorMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    name: string | null
    type: string | null
    config: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EvaluatorCountAggregateOutputType = {
    id: number
    projectId: number
    name: number
    type: number
    config: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EvaluatorMinAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    type?: true
    config?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EvaluatorMaxAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    type?: true
    config?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EvaluatorCountAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    type?: true
    config?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EvaluatorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Evaluator to aggregate.
     */
    where?: EvaluatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evaluators to fetch.
     */
    orderBy?: EvaluatorOrderByWithRelationInput | EvaluatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EvaluatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evaluators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evaluators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Evaluators
    **/
    _count?: true | EvaluatorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EvaluatorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EvaluatorMaxAggregateInputType
  }

  export type GetEvaluatorAggregateType<T extends EvaluatorAggregateArgs> = {
        [P in keyof T & keyof AggregateEvaluator]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvaluator[P]>
      : GetScalarType<T[P], AggregateEvaluator[P]>
  }




  export type EvaluatorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluatorWhereInput
    orderBy?: EvaluatorOrderByWithAggregationInput | EvaluatorOrderByWithAggregationInput[]
    by: EvaluatorScalarFieldEnum[] | EvaluatorScalarFieldEnum
    having?: EvaluatorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EvaluatorCountAggregateInputType | true
    _min?: EvaluatorMinAggregateInputType
    _max?: EvaluatorMaxAggregateInputType
  }

  export type EvaluatorGroupByOutputType = {
    id: string
    projectId: string
    name: string
    type: string
    config: string
    createdAt: Date
    updatedAt: Date
    _count: EvaluatorCountAggregateOutputType | null
    _min: EvaluatorMinAggregateOutputType | null
    _max: EvaluatorMaxAggregateOutputType | null
  }

  type GetEvaluatorGroupByPayload<T extends EvaluatorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EvaluatorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EvaluatorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EvaluatorGroupByOutputType[P]>
            : GetScalarType<T[P], EvaluatorGroupByOutputType[P]>
        }
      >
    >


  export type EvaluatorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    type?: boolean
    config?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["evaluator"]>



  export type EvaluatorSelectScalar = {
    id?: boolean
    projectId?: boolean
    name?: boolean
    type?: boolean
    config?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EvaluatorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "name" | "type" | "config" | "createdAt" | "updatedAt", ExtArgs["result"]["evaluator"]>
  export type EvaluatorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $EvaluatorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Evaluator"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      name: string
      type: string
      config: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["evaluator"]>
    composites: {}
  }

  type EvaluatorGetPayload<S extends boolean | null | undefined | EvaluatorDefaultArgs> = $Result.GetResult<Prisma.$EvaluatorPayload, S>

  type EvaluatorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EvaluatorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EvaluatorCountAggregateInputType | true
    }

  export interface EvaluatorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Evaluator'], meta: { name: 'Evaluator' } }
    /**
     * Find zero or one Evaluator that matches the filter.
     * @param {EvaluatorFindUniqueArgs} args - Arguments to find a Evaluator
     * @example
     * // Get one Evaluator
     * const evaluator = await prisma.evaluator.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EvaluatorFindUniqueArgs>(args: SelectSubset<T, EvaluatorFindUniqueArgs<ExtArgs>>): Prisma__EvaluatorClient<$Result.GetResult<Prisma.$EvaluatorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Evaluator that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EvaluatorFindUniqueOrThrowArgs} args - Arguments to find a Evaluator
     * @example
     * // Get one Evaluator
     * const evaluator = await prisma.evaluator.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EvaluatorFindUniqueOrThrowArgs>(args: SelectSubset<T, EvaluatorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EvaluatorClient<$Result.GetResult<Prisma.$EvaluatorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Evaluator that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluatorFindFirstArgs} args - Arguments to find a Evaluator
     * @example
     * // Get one Evaluator
     * const evaluator = await prisma.evaluator.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EvaluatorFindFirstArgs>(args?: SelectSubset<T, EvaluatorFindFirstArgs<ExtArgs>>): Prisma__EvaluatorClient<$Result.GetResult<Prisma.$EvaluatorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Evaluator that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluatorFindFirstOrThrowArgs} args - Arguments to find a Evaluator
     * @example
     * // Get one Evaluator
     * const evaluator = await prisma.evaluator.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EvaluatorFindFirstOrThrowArgs>(args?: SelectSubset<T, EvaluatorFindFirstOrThrowArgs<ExtArgs>>): Prisma__EvaluatorClient<$Result.GetResult<Prisma.$EvaluatorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Evaluators that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluatorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Evaluators
     * const evaluators = await prisma.evaluator.findMany()
     * 
     * // Get first 10 Evaluators
     * const evaluators = await prisma.evaluator.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const evaluatorWithIdOnly = await prisma.evaluator.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EvaluatorFindManyArgs>(args?: SelectSubset<T, EvaluatorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluatorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Evaluator.
     * @param {EvaluatorCreateArgs} args - Arguments to create a Evaluator.
     * @example
     * // Create one Evaluator
     * const Evaluator = await prisma.evaluator.create({
     *   data: {
     *     // ... data to create a Evaluator
     *   }
     * })
     * 
     */
    create<T extends EvaluatorCreateArgs>(args: SelectSubset<T, EvaluatorCreateArgs<ExtArgs>>): Prisma__EvaluatorClient<$Result.GetResult<Prisma.$EvaluatorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Evaluators.
     * @param {EvaluatorCreateManyArgs} args - Arguments to create many Evaluators.
     * @example
     * // Create many Evaluators
     * const evaluator = await prisma.evaluator.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EvaluatorCreateManyArgs>(args?: SelectSubset<T, EvaluatorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Evaluator.
     * @param {EvaluatorDeleteArgs} args - Arguments to delete one Evaluator.
     * @example
     * // Delete one Evaluator
     * const Evaluator = await prisma.evaluator.delete({
     *   where: {
     *     // ... filter to delete one Evaluator
     *   }
     * })
     * 
     */
    delete<T extends EvaluatorDeleteArgs>(args: SelectSubset<T, EvaluatorDeleteArgs<ExtArgs>>): Prisma__EvaluatorClient<$Result.GetResult<Prisma.$EvaluatorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Evaluator.
     * @param {EvaluatorUpdateArgs} args - Arguments to update one Evaluator.
     * @example
     * // Update one Evaluator
     * const evaluator = await prisma.evaluator.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EvaluatorUpdateArgs>(args: SelectSubset<T, EvaluatorUpdateArgs<ExtArgs>>): Prisma__EvaluatorClient<$Result.GetResult<Prisma.$EvaluatorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Evaluators.
     * @param {EvaluatorDeleteManyArgs} args - Arguments to filter Evaluators to delete.
     * @example
     * // Delete a few Evaluators
     * const { count } = await prisma.evaluator.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EvaluatorDeleteManyArgs>(args?: SelectSubset<T, EvaluatorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Evaluators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluatorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Evaluators
     * const evaluator = await prisma.evaluator.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EvaluatorUpdateManyArgs>(args: SelectSubset<T, EvaluatorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Evaluator.
     * @param {EvaluatorUpsertArgs} args - Arguments to update or create a Evaluator.
     * @example
     * // Update or create a Evaluator
     * const evaluator = await prisma.evaluator.upsert({
     *   create: {
     *     // ... data to create a Evaluator
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Evaluator we want to update
     *   }
     * })
     */
    upsert<T extends EvaluatorUpsertArgs>(args: SelectSubset<T, EvaluatorUpsertArgs<ExtArgs>>): Prisma__EvaluatorClient<$Result.GetResult<Prisma.$EvaluatorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Evaluators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluatorCountArgs} args - Arguments to filter Evaluators to count.
     * @example
     * // Count the number of Evaluators
     * const count = await prisma.evaluator.count({
     *   where: {
     *     // ... the filter for the Evaluators we want to count
     *   }
     * })
    **/
    count<T extends EvaluatorCountArgs>(
      args?: Subset<T, EvaluatorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EvaluatorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Evaluator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluatorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EvaluatorAggregateArgs>(args: Subset<T, EvaluatorAggregateArgs>): Prisma.PrismaPromise<GetEvaluatorAggregateType<T>>

    /**
     * Group by Evaluator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluatorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EvaluatorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EvaluatorGroupByArgs['orderBy'] }
        : { orderBy?: EvaluatorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EvaluatorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEvaluatorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Evaluator model
   */
  readonly fields: EvaluatorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Evaluator.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EvaluatorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Evaluator model
   */
  interface EvaluatorFieldRefs {
    readonly id: FieldRef<"Evaluator", 'String'>
    readonly projectId: FieldRef<"Evaluator", 'String'>
    readonly name: FieldRef<"Evaluator", 'String'>
    readonly type: FieldRef<"Evaluator", 'String'>
    readonly config: FieldRef<"Evaluator", 'String'>
    readonly createdAt: FieldRef<"Evaluator", 'DateTime'>
    readonly updatedAt: FieldRef<"Evaluator", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Evaluator findUnique
   */
  export type EvaluatorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluator
     */
    select?: EvaluatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluator
     */
    omit?: EvaluatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluatorInclude<ExtArgs> | null
    /**
     * Filter, which Evaluator to fetch.
     */
    where: EvaluatorWhereUniqueInput
  }

  /**
   * Evaluator findUniqueOrThrow
   */
  export type EvaluatorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluator
     */
    select?: EvaluatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluator
     */
    omit?: EvaluatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluatorInclude<ExtArgs> | null
    /**
     * Filter, which Evaluator to fetch.
     */
    where: EvaluatorWhereUniqueInput
  }

  /**
   * Evaluator findFirst
   */
  export type EvaluatorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluator
     */
    select?: EvaluatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluator
     */
    omit?: EvaluatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluatorInclude<ExtArgs> | null
    /**
     * Filter, which Evaluator to fetch.
     */
    where?: EvaluatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evaluators to fetch.
     */
    orderBy?: EvaluatorOrderByWithRelationInput | EvaluatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Evaluators.
     */
    cursor?: EvaluatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evaluators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evaluators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Evaluators.
     */
    distinct?: EvaluatorScalarFieldEnum | EvaluatorScalarFieldEnum[]
  }

  /**
   * Evaluator findFirstOrThrow
   */
  export type EvaluatorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluator
     */
    select?: EvaluatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluator
     */
    omit?: EvaluatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluatorInclude<ExtArgs> | null
    /**
     * Filter, which Evaluator to fetch.
     */
    where?: EvaluatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evaluators to fetch.
     */
    orderBy?: EvaluatorOrderByWithRelationInput | EvaluatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Evaluators.
     */
    cursor?: EvaluatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evaluators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evaluators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Evaluators.
     */
    distinct?: EvaluatorScalarFieldEnum | EvaluatorScalarFieldEnum[]
  }

  /**
   * Evaluator findMany
   */
  export type EvaluatorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluator
     */
    select?: EvaluatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluator
     */
    omit?: EvaluatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluatorInclude<ExtArgs> | null
    /**
     * Filter, which Evaluators to fetch.
     */
    where?: EvaluatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evaluators to fetch.
     */
    orderBy?: EvaluatorOrderByWithRelationInput | EvaluatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Evaluators.
     */
    cursor?: EvaluatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evaluators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evaluators.
     */
    skip?: number
    distinct?: EvaluatorScalarFieldEnum | EvaluatorScalarFieldEnum[]
  }

  /**
   * Evaluator create
   */
  export type EvaluatorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluator
     */
    select?: EvaluatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluator
     */
    omit?: EvaluatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluatorInclude<ExtArgs> | null
    /**
     * The data needed to create a Evaluator.
     */
    data: XOR<EvaluatorCreateInput, EvaluatorUncheckedCreateInput>
  }

  /**
   * Evaluator createMany
   */
  export type EvaluatorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Evaluators.
     */
    data: EvaluatorCreateManyInput | EvaluatorCreateManyInput[]
  }

  /**
   * Evaluator update
   */
  export type EvaluatorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluator
     */
    select?: EvaluatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluator
     */
    omit?: EvaluatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluatorInclude<ExtArgs> | null
    /**
     * The data needed to update a Evaluator.
     */
    data: XOR<EvaluatorUpdateInput, EvaluatorUncheckedUpdateInput>
    /**
     * Choose, which Evaluator to update.
     */
    where: EvaluatorWhereUniqueInput
  }

  /**
   * Evaluator updateMany
   */
  export type EvaluatorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Evaluators.
     */
    data: XOR<EvaluatorUpdateManyMutationInput, EvaluatorUncheckedUpdateManyInput>
    /**
     * Filter which Evaluators to update
     */
    where?: EvaluatorWhereInput
    /**
     * Limit how many Evaluators to update.
     */
    limit?: number
  }

  /**
   * Evaluator upsert
   */
  export type EvaluatorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluator
     */
    select?: EvaluatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluator
     */
    omit?: EvaluatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluatorInclude<ExtArgs> | null
    /**
     * The filter to search for the Evaluator to update in case it exists.
     */
    where: EvaluatorWhereUniqueInput
    /**
     * In case the Evaluator found by the `where` argument doesn't exist, create a new Evaluator with this data.
     */
    create: XOR<EvaluatorCreateInput, EvaluatorUncheckedCreateInput>
    /**
     * In case the Evaluator was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EvaluatorUpdateInput, EvaluatorUncheckedUpdateInput>
  }

  /**
   * Evaluator delete
   */
  export type EvaluatorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluator
     */
    select?: EvaluatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluator
     */
    omit?: EvaluatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluatorInclude<ExtArgs> | null
    /**
     * Filter which Evaluator to delete.
     */
    where: EvaluatorWhereUniqueInput
  }

  /**
   * Evaluator deleteMany
   */
  export type EvaluatorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Evaluators to delete
     */
    where?: EvaluatorWhereInput
    /**
     * Limit how many Evaluators to delete.
     */
    limit?: number
  }

  /**
   * Evaluator without action
   */
  export type EvaluatorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluator
     */
    select?: EvaluatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluator
     */
    omit?: EvaluatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluatorInclude<ExtArgs> | null
  }


  /**
   * Model Experiment
   */

  export type AggregateExperiment = {
    _count: ExperimentCountAggregateOutputType | null
    _avg: ExperimentAvgAggregateOutputType | null
    _sum: ExperimentSumAggregateOutputType | null
    _min: ExperimentMinAggregateOutputType | null
    _max: ExperimentMaxAggregateOutputType | null
  }

  export type ExperimentAvgAggregateOutputType = {
    qualityScore: number | null
    passRate: number | null
    avgLatencyMs: number | null
    totalTokens: number | null
    totalCostUsd: number | null
    cacheHitRate: number | null
    cacheMissRate: number | null
    llmCallsAvoided: number | null
    cachedInputTokens: number | null
    estimatedCostSavedUsd: number | null
    allowedQualityDrop: number | null
    regressionDelta: number | null
  }

  export type ExperimentSumAggregateOutputType = {
    qualityScore: number | null
    passRate: number | null
    avgLatencyMs: number | null
    totalTokens: number | null
    totalCostUsd: number | null
    cacheHitRate: number | null
    cacheMissRate: number | null
    llmCallsAvoided: number | null
    cachedInputTokens: number | null
    estimatedCostSavedUsd: number | null
    allowedQualityDrop: number | null
    regressionDelta: number | null
  }

  export type ExperimentMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    datasetId: string | null
    name: string | null
    model: string | null
    status: string | null
    qualityScore: number | null
    passRate: number | null
    avgLatencyMs: number | null
    totalTokens: number | null
    totalCostUsd: number | null
    cacheHitRate: number | null
    cacheMissRate: number | null
    llmCallsAvoided: number | null
    cachedInputTokens: number | null
    estimatedCostSavedUsd: number | null
    createdAt: Date | null
    updatedAt: Date | null
    allowedQualityDrop: number | null
    errorMessage: string | null
    failOnRegression: boolean | null
    regressionDelta: number | null
    regressionPassed: boolean | null
    useCache: boolean | null
  }

  export type ExperimentMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    datasetId: string | null
    name: string | null
    model: string | null
    status: string | null
    qualityScore: number | null
    passRate: number | null
    avgLatencyMs: number | null
    totalTokens: number | null
    totalCostUsd: number | null
    cacheHitRate: number | null
    cacheMissRate: number | null
    llmCallsAvoided: number | null
    cachedInputTokens: number | null
    estimatedCostSavedUsd: number | null
    createdAt: Date | null
    updatedAt: Date | null
    allowedQualityDrop: number | null
    errorMessage: string | null
    failOnRegression: boolean | null
    regressionDelta: number | null
    regressionPassed: boolean | null
    useCache: boolean | null
  }

  export type ExperimentCountAggregateOutputType = {
    id: number
    projectId: number
    datasetId: number
    name: number
    model: number
    status: number
    qualityScore: number
    passRate: number
    avgLatencyMs: number
    totalTokens: number
    totalCostUsd: number
    cacheHitRate: number
    cacheMissRate: number
    llmCallsAvoided: number
    cachedInputTokens: number
    estimatedCostSavedUsd: number
    createdAt: number
    updatedAt: number
    allowedQualityDrop: number
    errorMessage: number
    failOnRegression: number
    regressionDelta: number
    regressionPassed: number
    useCache: number
    _all: number
  }


  export type ExperimentAvgAggregateInputType = {
    qualityScore?: true
    passRate?: true
    avgLatencyMs?: true
    totalTokens?: true
    totalCostUsd?: true
    cacheHitRate?: true
    cacheMissRate?: true
    llmCallsAvoided?: true
    cachedInputTokens?: true
    estimatedCostSavedUsd?: true
    allowedQualityDrop?: true
    regressionDelta?: true
  }

  export type ExperimentSumAggregateInputType = {
    qualityScore?: true
    passRate?: true
    avgLatencyMs?: true
    totalTokens?: true
    totalCostUsd?: true
    cacheHitRate?: true
    cacheMissRate?: true
    llmCallsAvoided?: true
    cachedInputTokens?: true
    estimatedCostSavedUsd?: true
    allowedQualityDrop?: true
    regressionDelta?: true
  }

  export type ExperimentMinAggregateInputType = {
    id?: true
    projectId?: true
    datasetId?: true
    name?: true
    model?: true
    status?: true
    qualityScore?: true
    passRate?: true
    avgLatencyMs?: true
    totalTokens?: true
    totalCostUsd?: true
    cacheHitRate?: true
    cacheMissRate?: true
    llmCallsAvoided?: true
    cachedInputTokens?: true
    estimatedCostSavedUsd?: true
    createdAt?: true
    updatedAt?: true
    allowedQualityDrop?: true
    errorMessage?: true
    failOnRegression?: true
    regressionDelta?: true
    regressionPassed?: true
    useCache?: true
  }

  export type ExperimentMaxAggregateInputType = {
    id?: true
    projectId?: true
    datasetId?: true
    name?: true
    model?: true
    status?: true
    qualityScore?: true
    passRate?: true
    avgLatencyMs?: true
    totalTokens?: true
    totalCostUsd?: true
    cacheHitRate?: true
    cacheMissRate?: true
    llmCallsAvoided?: true
    cachedInputTokens?: true
    estimatedCostSavedUsd?: true
    createdAt?: true
    updatedAt?: true
    allowedQualityDrop?: true
    errorMessage?: true
    failOnRegression?: true
    regressionDelta?: true
    regressionPassed?: true
    useCache?: true
  }

  export type ExperimentCountAggregateInputType = {
    id?: true
    projectId?: true
    datasetId?: true
    name?: true
    model?: true
    status?: true
    qualityScore?: true
    passRate?: true
    avgLatencyMs?: true
    totalTokens?: true
    totalCostUsd?: true
    cacheHitRate?: true
    cacheMissRate?: true
    llmCallsAvoided?: true
    cachedInputTokens?: true
    estimatedCostSavedUsd?: true
    createdAt?: true
    updatedAt?: true
    allowedQualityDrop?: true
    errorMessage?: true
    failOnRegression?: true
    regressionDelta?: true
    regressionPassed?: true
    useCache?: true
    _all?: true
  }

  export type ExperimentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Experiment to aggregate.
     */
    where?: ExperimentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiments to fetch.
     */
    orderBy?: ExperimentOrderByWithRelationInput | ExperimentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExperimentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Experiments
    **/
    _count?: true | ExperimentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExperimentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExperimentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExperimentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExperimentMaxAggregateInputType
  }

  export type GetExperimentAggregateType<T extends ExperimentAggregateArgs> = {
        [P in keyof T & keyof AggregateExperiment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExperiment[P]>
      : GetScalarType<T[P], AggregateExperiment[P]>
  }




  export type ExperimentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExperimentWhereInput
    orderBy?: ExperimentOrderByWithAggregationInput | ExperimentOrderByWithAggregationInput[]
    by: ExperimentScalarFieldEnum[] | ExperimentScalarFieldEnum
    having?: ExperimentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExperimentCountAggregateInputType | true
    _avg?: ExperimentAvgAggregateInputType
    _sum?: ExperimentSumAggregateInputType
    _min?: ExperimentMinAggregateInputType
    _max?: ExperimentMaxAggregateInputType
  }

  export type ExperimentGroupByOutputType = {
    id: string
    projectId: string
    datasetId: string
    name: string
    model: string
    status: string
    qualityScore: number | null
    passRate: number | null
    avgLatencyMs: number | null
    totalTokens: number
    totalCostUsd: number
    cacheHitRate: number
    cacheMissRate: number
    llmCallsAvoided: number
    cachedInputTokens: number
    estimatedCostSavedUsd: number
    createdAt: Date
    updatedAt: Date
    allowedQualityDrop: number
    errorMessage: string | null
    failOnRegression: boolean
    regressionDelta: number | null
    regressionPassed: boolean
    useCache: boolean
    _count: ExperimentCountAggregateOutputType | null
    _avg: ExperimentAvgAggregateOutputType | null
    _sum: ExperimentSumAggregateOutputType | null
    _min: ExperimentMinAggregateOutputType | null
    _max: ExperimentMaxAggregateOutputType | null
  }

  type GetExperimentGroupByPayload<T extends ExperimentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExperimentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExperimentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExperimentGroupByOutputType[P]>
            : GetScalarType<T[P], ExperimentGroupByOutputType[P]>
        }
      >
    >


  export type ExperimentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    datasetId?: boolean
    name?: boolean
    model?: boolean
    status?: boolean
    qualityScore?: boolean
    passRate?: boolean
    avgLatencyMs?: boolean
    totalTokens?: boolean
    totalCostUsd?: boolean
    cacheHitRate?: boolean
    cacheMissRate?: boolean
    llmCallsAvoided?: boolean
    cachedInputTokens?: boolean
    estimatedCostSavedUsd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    allowedQualityDrop?: boolean
    errorMessage?: boolean
    failOnRegression?: boolean
    regressionDelta?: boolean
    regressionPassed?: boolean
    useCache?: boolean
    results?: boolean | Experiment$resultsArgs<ExtArgs>
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    _count?: boolean | ExperimentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["experiment"]>



  export type ExperimentSelectScalar = {
    id?: boolean
    projectId?: boolean
    datasetId?: boolean
    name?: boolean
    model?: boolean
    status?: boolean
    qualityScore?: boolean
    passRate?: boolean
    avgLatencyMs?: boolean
    totalTokens?: boolean
    totalCostUsd?: boolean
    cacheHitRate?: boolean
    cacheMissRate?: boolean
    llmCallsAvoided?: boolean
    cachedInputTokens?: boolean
    estimatedCostSavedUsd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    allowedQualityDrop?: boolean
    errorMessage?: boolean
    failOnRegression?: boolean
    regressionDelta?: boolean
    regressionPassed?: boolean
    useCache?: boolean
  }

  export type ExperimentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "datasetId" | "name" | "model" | "status" | "qualityScore" | "passRate" | "avgLatencyMs" | "totalTokens" | "totalCostUsd" | "cacheHitRate" | "cacheMissRate" | "llmCallsAvoided" | "cachedInputTokens" | "estimatedCostSavedUsd" | "createdAt" | "updatedAt" | "allowedQualityDrop" | "errorMessage" | "failOnRegression" | "regressionDelta" | "regressionPassed" | "useCache", ExtArgs["result"]["experiment"]>
  export type ExperimentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    results?: boolean | Experiment$resultsArgs<ExtArgs>
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    _count?: boolean | ExperimentCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ExperimentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Experiment"
    objects: {
      results: Prisma.$EvaluationResultPayload<ExtArgs>[]
      dataset: Prisma.$DatasetPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      datasetId: string
      name: string
      model: string
      status: string
      qualityScore: number | null
      passRate: number | null
      avgLatencyMs: number | null
      totalTokens: number
      totalCostUsd: number
      cacheHitRate: number
      cacheMissRate: number
      llmCallsAvoided: number
      cachedInputTokens: number
      estimatedCostSavedUsd: number
      createdAt: Date
      updatedAt: Date
      allowedQualityDrop: number
      errorMessage: string | null
      failOnRegression: boolean
      regressionDelta: number | null
      regressionPassed: boolean
      useCache: boolean
    }, ExtArgs["result"]["experiment"]>
    composites: {}
  }

  type ExperimentGetPayload<S extends boolean | null | undefined | ExperimentDefaultArgs> = $Result.GetResult<Prisma.$ExperimentPayload, S>

  type ExperimentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExperimentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExperimentCountAggregateInputType | true
    }

  export interface ExperimentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Experiment'], meta: { name: 'Experiment' } }
    /**
     * Find zero or one Experiment that matches the filter.
     * @param {ExperimentFindUniqueArgs} args - Arguments to find a Experiment
     * @example
     * // Get one Experiment
     * const experiment = await prisma.experiment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExperimentFindUniqueArgs>(args: SelectSubset<T, ExperimentFindUniqueArgs<ExtArgs>>): Prisma__ExperimentClient<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Experiment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExperimentFindUniqueOrThrowArgs} args - Arguments to find a Experiment
     * @example
     * // Get one Experiment
     * const experiment = await prisma.experiment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExperimentFindUniqueOrThrowArgs>(args: SelectSubset<T, ExperimentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExperimentClient<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Experiment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentFindFirstArgs} args - Arguments to find a Experiment
     * @example
     * // Get one Experiment
     * const experiment = await prisma.experiment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExperimentFindFirstArgs>(args?: SelectSubset<T, ExperimentFindFirstArgs<ExtArgs>>): Prisma__ExperimentClient<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Experiment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentFindFirstOrThrowArgs} args - Arguments to find a Experiment
     * @example
     * // Get one Experiment
     * const experiment = await prisma.experiment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExperimentFindFirstOrThrowArgs>(args?: SelectSubset<T, ExperimentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExperimentClient<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Experiments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Experiments
     * const experiments = await prisma.experiment.findMany()
     * 
     * // Get first 10 Experiments
     * const experiments = await prisma.experiment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const experimentWithIdOnly = await prisma.experiment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExperimentFindManyArgs>(args?: SelectSubset<T, ExperimentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Experiment.
     * @param {ExperimentCreateArgs} args - Arguments to create a Experiment.
     * @example
     * // Create one Experiment
     * const Experiment = await prisma.experiment.create({
     *   data: {
     *     // ... data to create a Experiment
     *   }
     * })
     * 
     */
    create<T extends ExperimentCreateArgs>(args: SelectSubset<T, ExperimentCreateArgs<ExtArgs>>): Prisma__ExperimentClient<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Experiments.
     * @param {ExperimentCreateManyArgs} args - Arguments to create many Experiments.
     * @example
     * // Create many Experiments
     * const experiment = await prisma.experiment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExperimentCreateManyArgs>(args?: SelectSubset<T, ExperimentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Experiment.
     * @param {ExperimentDeleteArgs} args - Arguments to delete one Experiment.
     * @example
     * // Delete one Experiment
     * const Experiment = await prisma.experiment.delete({
     *   where: {
     *     // ... filter to delete one Experiment
     *   }
     * })
     * 
     */
    delete<T extends ExperimentDeleteArgs>(args: SelectSubset<T, ExperimentDeleteArgs<ExtArgs>>): Prisma__ExperimentClient<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Experiment.
     * @param {ExperimentUpdateArgs} args - Arguments to update one Experiment.
     * @example
     * // Update one Experiment
     * const experiment = await prisma.experiment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExperimentUpdateArgs>(args: SelectSubset<T, ExperimentUpdateArgs<ExtArgs>>): Prisma__ExperimentClient<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Experiments.
     * @param {ExperimentDeleteManyArgs} args - Arguments to filter Experiments to delete.
     * @example
     * // Delete a few Experiments
     * const { count } = await prisma.experiment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExperimentDeleteManyArgs>(args?: SelectSubset<T, ExperimentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Experiments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Experiments
     * const experiment = await prisma.experiment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExperimentUpdateManyArgs>(args: SelectSubset<T, ExperimentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Experiment.
     * @param {ExperimentUpsertArgs} args - Arguments to update or create a Experiment.
     * @example
     * // Update or create a Experiment
     * const experiment = await prisma.experiment.upsert({
     *   create: {
     *     // ... data to create a Experiment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Experiment we want to update
     *   }
     * })
     */
    upsert<T extends ExperimentUpsertArgs>(args: SelectSubset<T, ExperimentUpsertArgs<ExtArgs>>): Prisma__ExperimentClient<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Experiments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentCountArgs} args - Arguments to filter Experiments to count.
     * @example
     * // Count the number of Experiments
     * const count = await prisma.experiment.count({
     *   where: {
     *     // ... the filter for the Experiments we want to count
     *   }
     * })
    **/
    count<T extends ExperimentCountArgs>(
      args?: Subset<T, ExperimentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExperimentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Experiment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExperimentAggregateArgs>(args: Subset<T, ExperimentAggregateArgs>): Prisma.PrismaPromise<GetExperimentAggregateType<T>>

    /**
     * Group by Experiment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExperimentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExperimentGroupByArgs['orderBy'] }
        : { orderBy?: ExperimentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExperimentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExperimentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Experiment model
   */
  readonly fields: ExperimentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Experiment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExperimentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    results<T extends Experiment$resultsArgs<ExtArgs> = {}>(args?: Subset<T, Experiment$resultsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dataset<T extends DatasetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DatasetDefaultArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Experiment model
   */
  interface ExperimentFieldRefs {
    readonly id: FieldRef<"Experiment", 'String'>
    readonly projectId: FieldRef<"Experiment", 'String'>
    readonly datasetId: FieldRef<"Experiment", 'String'>
    readonly name: FieldRef<"Experiment", 'String'>
    readonly model: FieldRef<"Experiment", 'String'>
    readonly status: FieldRef<"Experiment", 'String'>
    readonly qualityScore: FieldRef<"Experiment", 'Float'>
    readonly passRate: FieldRef<"Experiment", 'Float'>
    readonly avgLatencyMs: FieldRef<"Experiment", 'Float'>
    readonly totalTokens: FieldRef<"Experiment", 'Int'>
    readonly totalCostUsd: FieldRef<"Experiment", 'Float'>
    readonly cacheHitRate: FieldRef<"Experiment", 'Float'>
    readonly cacheMissRate: FieldRef<"Experiment", 'Float'>
    readonly llmCallsAvoided: FieldRef<"Experiment", 'Int'>
    readonly cachedInputTokens: FieldRef<"Experiment", 'Int'>
    readonly estimatedCostSavedUsd: FieldRef<"Experiment", 'Float'>
    readonly createdAt: FieldRef<"Experiment", 'DateTime'>
    readonly updatedAt: FieldRef<"Experiment", 'DateTime'>
    readonly allowedQualityDrop: FieldRef<"Experiment", 'Float'>
    readonly errorMessage: FieldRef<"Experiment", 'String'>
    readonly failOnRegression: FieldRef<"Experiment", 'Boolean'>
    readonly regressionDelta: FieldRef<"Experiment", 'Float'>
    readonly regressionPassed: FieldRef<"Experiment", 'Boolean'>
    readonly useCache: FieldRef<"Experiment", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Experiment findUnique
   */
  export type ExperimentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
    /**
     * Filter, which Experiment to fetch.
     */
    where: ExperimentWhereUniqueInput
  }

  /**
   * Experiment findUniqueOrThrow
   */
  export type ExperimentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
    /**
     * Filter, which Experiment to fetch.
     */
    where: ExperimentWhereUniqueInput
  }

  /**
   * Experiment findFirst
   */
  export type ExperimentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
    /**
     * Filter, which Experiment to fetch.
     */
    where?: ExperimentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiments to fetch.
     */
    orderBy?: ExperimentOrderByWithRelationInput | ExperimentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Experiments.
     */
    cursor?: ExperimentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Experiments.
     */
    distinct?: ExperimentScalarFieldEnum | ExperimentScalarFieldEnum[]
  }

  /**
   * Experiment findFirstOrThrow
   */
  export type ExperimentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
    /**
     * Filter, which Experiment to fetch.
     */
    where?: ExperimentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiments to fetch.
     */
    orderBy?: ExperimentOrderByWithRelationInput | ExperimentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Experiments.
     */
    cursor?: ExperimentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Experiments.
     */
    distinct?: ExperimentScalarFieldEnum | ExperimentScalarFieldEnum[]
  }

  /**
   * Experiment findMany
   */
  export type ExperimentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
    /**
     * Filter, which Experiments to fetch.
     */
    where?: ExperimentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiments to fetch.
     */
    orderBy?: ExperimentOrderByWithRelationInput | ExperimentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Experiments.
     */
    cursor?: ExperimentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiments.
     */
    skip?: number
    distinct?: ExperimentScalarFieldEnum | ExperimentScalarFieldEnum[]
  }

  /**
   * Experiment create
   */
  export type ExperimentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
    /**
     * The data needed to create a Experiment.
     */
    data: XOR<ExperimentCreateInput, ExperimentUncheckedCreateInput>
  }

  /**
   * Experiment createMany
   */
  export type ExperimentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Experiments.
     */
    data: ExperimentCreateManyInput | ExperimentCreateManyInput[]
  }

  /**
   * Experiment update
   */
  export type ExperimentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
    /**
     * The data needed to update a Experiment.
     */
    data: XOR<ExperimentUpdateInput, ExperimentUncheckedUpdateInput>
    /**
     * Choose, which Experiment to update.
     */
    where: ExperimentWhereUniqueInput
  }

  /**
   * Experiment updateMany
   */
  export type ExperimentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Experiments.
     */
    data: XOR<ExperimentUpdateManyMutationInput, ExperimentUncheckedUpdateManyInput>
    /**
     * Filter which Experiments to update
     */
    where?: ExperimentWhereInput
    /**
     * Limit how many Experiments to update.
     */
    limit?: number
  }

  /**
   * Experiment upsert
   */
  export type ExperimentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
    /**
     * The filter to search for the Experiment to update in case it exists.
     */
    where: ExperimentWhereUniqueInput
    /**
     * In case the Experiment found by the `where` argument doesn't exist, create a new Experiment with this data.
     */
    create: XOR<ExperimentCreateInput, ExperimentUncheckedCreateInput>
    /**
     * In case the Experiment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExperimentUpdateInput, ExperimentUncheckedUpdateInput>
  }

  /**
   * Experiment delete
   */
  export type ExperimentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
    /**
     * Filter which Experiment to delete.
     */
    where: ExperimentWhereUniqueInput
  }

  /**
   * Experiment deleteMany
   */
  export type ExperimentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Experiments to delete
     */
    where?: ExperimentWhereInput
    /**
     * Limit how many Experiments to delete.
     */
    limit?: number
  }

  /**
   * Experiment.results
   */
  export type Experiment$resultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResult
     */
    select?: EvaluationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResult
     */
    omit?: EvaluationResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResultInclude<ExtArgs> | null
    where?: EvaluationResultWhereInput
    orderBy?: EvaluationResultOrderByWithRelationInput | EvaluationResultOrderByWithRelationInput[]
    cursor?: EvaluationResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EvaluationResultScalarFieldEnum | EvaluationResultScalarFieldEnum[]
  }

  /**
   * Experiment without action
   */
  export type ExperimentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
  }


  /**
   * Model EvaluationResult
   */

  export type AggregateEvaluationResult = {
    _count: EvaluationResultCountAggregateOutputType | null
    _avg: EvaluationResultAvgAggregateOutputType | null
    _sum: EvaluationResultSumAggregateOutputType | null
    _min: EvaluationResultMinAggregateOutputType | null
    _max: EvaluationResultMaxAggregateOutputType | null
  }

  export type EvaluationResultAvgAggregateOutputType = {
    score: number | null
    latencyMs: number | null
    ttftMs: number | null
    inputTokens: number | null
    outputTokens: number | null
    cachedInputTokens: number | null
    estimatedCostUsd: number | null
    totalTokens: number | null
    uncachedEstimatedCostUsd: number | null
  }

  export type EvaluationResultSumAggregateOutputType = {
    score: number | null
    latencyMs: number | null
    ttftMs: number | null
    inputTokens: number | null
    outputTokens: number | null
    cachedInputTokens: number | null
    estimatedCostUsd: number | null
    totalTokens: number | null
    uncachedEstimatedCostUsd: number | null
  }

  export type EvaluationResultMinAggregateOutputType = {
    id: string | null
    experimentId: string | null
    testCaseId: string | null
    actualOutput: string | null
    score: number | null
    passed: boolean | null
    latencyMs: number | null
    ttftMs: number | null
    inputTokens: number | null
    outputTokens: number | null
    cacheHit: boolean | null
    reason: string | null
    createdAt: Date | null
    cachedInputTokens: number | null
    estimatedCostUsd: number | null
    totalTokens: number | null
    uncachedEstimatedCostUsd: number | null
  }

  export type EvaluationResultMaxAggregateOutputType = {
    id: string | null
    experimentId: string | null
    testCaseId: string | null
    actualOutput: string | null
    score: number | null
    passed: boolean | null
    latencyMs: number | null
    ttftMs: number | null
    inputTokens: number | null
    outputTokens: number | null
    cacheHit: boolean | null
    reason: string | null
    createdAt: Date | null
    cachedInputTokens: number | null
    estimatedCostUsd: number | null
    totalTokens: number | null
    uncachedEstimatedCostUsd: number | null
  }

  export type EvaluationResultCountAggregateOutputType = {
    id: number
    experimentId: number
    testCaseId: number
    actualOutput: number
    score: number
    passed: number
    latencyMs: number
    ttftMs: number
    inputTokens: number
    outputTokens: number
    cacheHit: number
    reason: number
    createdAt: number
    cachedInputTokens: number
    estimatedCostUsd: number
    totalTokens: number
    uncachedEstimatedCostUsd: number
    _all: number
  }


  export type EvaluationResultAvgAggregateInputType = {
    score?: true
    latencyMs?: true
    ttftMs?: true
    inputTokens?: true
    outputTokens?: true
    cachedInputTokens?: true
    estimatedCostUsd?: true
    totalTokens?: true
    uncachedEstimatedCostUsd?: true
  }

  export type EvaluationResultSumAggregateInputType = {
    score?: true
    latencyMs?: true
    ttftMs?: true
    inputTokens?: true
    outputTokens?: true
    cachedInputTokens?: true
    estimatedCostUsd?: true
    totalTokens?: true
    uncachedEstimatedCostUsd?: true
  }

  export type EvaluationResultMinAggregateInputType = {
    id?: true
    experimentId?: true
    testCaseId?: true
    actualOutput?: true
    score?: true
    passed?: true
    latencyMs?: true
    ttftMs?: true
    inputTokens?: true
    outputTokens?: true
    cacheHit?: true
    reason?: true
    createdAt?: true
    cachedInputTokens?: true
    estimatedCostUsd?: true
    totalTokens?: true
    uncachedEstimatedCostUsd?: true
  }

  export type EvaluationResultMaxAggregateInputType = {
    id?: true
    experimentId?: true
    testCaseId?: true
    actualOutput?: true
    score?: true
    passed?: true
    latencyMs?: true
    ttftMs?: true
    inputTokens?: true
    outputTokens?: true
    cacheHit?: true
    reason?: true
    createdAt?: true
    cachedInputTokens?: true
    estimatedCostUsd?: true
    totalTokens?: true
    uncachedEstimatedCostUsd?: true
  }

  export type EvaluationResultCountAggregateInputType = {
    id?: true
    experimentId?: true
    testCaseId?: true
    actualOutput?: true
    score?: true
    passed?: true
    latencyMs?: true
    ttftMs?: true
    inputTokens?: true
    outputTokens?: true
    cacheHit?: true
    reason?: true
    createdAt?: true
    cachedInputTokens?: true
    estimatedCostUsd?: true
    totalTokens?: true
    uncachedEstimatedCostUsd?: true
    _all?: true
  }

  export type EvaluationResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EvaluationResult to aggregate.
     */
    where?: EvaluationResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvaluationResults to fetch.
     */
    orderBy?: EvaluationResultOrderByWithRelationInput | EvaluationResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EvaluationResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvaluationResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvaluationResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EvaluationResults
    **/
    _count?: true | EvaluationResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EvaluationResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EvaluationResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EvaluationResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EvaluationResultMaxAggregateInputType
  }

  export type GetEvaluationResultAggregateType<T extends EvaluationResultAggregateArgs> = {
        [P in keyof T & keyof AggregateEvaluationResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvaluationResult[P]>
      : GetScalarType<T[P], AggregateEvaluationResult[P]>
  }




  export type EvaluationResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluationResultWhereInput
    orderBy?: EvaluationResultOrderByWithAggregationInput | EvaluationResultOrderByWithAggregationInput[]
    by: EvaluationResultScalarFieldEnum[] | EvaluationResultScalarFieldEnum
    having?: EvaluationResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EvaluationResultCountAggregateInputType | true
    _avg?: EvaluationResultAvgAggregateInputType
    _sum?: EvaluationResultSumAggregateInputType
    _min?: EvaluationResultMinAggregateInputType
    _max?: EvaluationResultMaxAggregateInputType
  }

  export type EvaluationResultGroupByOutputType = {
    id: string
    experimentId: string
    testCaseId: string
    actualOutput: string
    score: number
    passed: boolean
    latencyMs: number | null
    ttftMs: number | null
    inputTokens: number | null
    outputTokens: number | null
    cacheHit: boolean
    reason: string | null
    createdAt: Date
    cachedInputTokens: number
    estimatedCostUsd: number | null
    totalTokens: number | null
    uncachedEstimatedCostUsd: number | null
    _count: EvaluationResultCountAggregateOutputType | null
    _avg: EvaluationResultAvgAggregateOutputType | null
    _sum: EvaluationResultSumAggregateOutputType | null
    _min: EvaluationResultMinAggregateOutputType | null
    _max: EvaluationResultMaxAggregateOutputType | null
  }

  type GetEvaluationResultGroupByPayload<T extends EvaluationResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EvaluationResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EvaluationResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EvaluationResultGroupByOutputType[P]>
            : GetScalarType<T[P], EvaluationResultGroupByOutputType[P]>
        }
      >
    >


  export type EvaluationResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    experimentId?: boolean
    testCaseId?: boolean
    actualOutput?: boolean
    score?: boolean
    passed?: boolean
    latencyMs?: boolean
    ttftMs?: boolean
    inputTokens?: boolean
    outputTokens?: boolean
    cacheHit?: boolean
    reason?: boolean
    createdAt?: boolean
    cachedInputTokens?: boolean
    estimatedCostUsd?: boolean
    totalTokens?: boolean
    uncachedEstimatedCostUsd?: boolean
    experiment?: boolean | ExperimentDefaultArgs<ExtArgs>
    testCase?: boolean | TestCaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["evaluationResult"]>



  export type EvaluationResultSelectScalar = {
    id?: boolean
    experimentId?: boolean
    testCaseId?: boolean
    actualOutput?: boolean
    score?: boolean
    passed?: boolean
    latencyMs?: boolean
    ttftMs?: boolean
    inputTokens?: boolean
    outputTokens?: boolean
    cacheHit?: boolean
    reason?: boolean
    createdAt?: boolean
    cachedInputTokens?: boolean
    estimatedCostUsd?: boolean
    totalTokens?: boolean
    uncachedEstimatedCostUsd?: boolean
  }

  export type EvaluationResultOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "experimentId" | "testCaseId" | "actualOutput" | "score" | "passed" | "latencyMs" | "ttftMs" | "inputTokens" | "outputTokens" | "cacheHit" | "reason" | "createdAt" | "cachedInputTokens" | "estimatedCostUsd" | "totalTokens" | "uncachedEstimatedCostUsd", ExtArgs["result"]["evaluationResult"]>
  export type EvaluationResultInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    experiment?: boolean | ExperimentDefaultArgs<ExtArgs>
    testCase?: boolean | TestCaseDefaultArgs<ExtArgs>
  }

  export type $EvaluationResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EvaluationResult"
    objects: {
      experiment: Prisma.$ExperimentPayload<ExtArgs>
      testCase: Prisma.$TestCasePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      experimentId: string
      testCaseId: string
      actualOutput: string
      score: number
      passed: boolean
      latencyMs: number | null
      ttftMs: number | null
      inputTokens: number | null
      outputTokens: number | null
      cacheHit: boolean
      reason: string | null
      createdAt: Date
      cachedInputTokens: number
      estimatedCostUsd: number | null
      totalTokens: number | null
      uncachedEstimatedCostUsd: number | null
    }, ExtArgs["result"]["evaluationResult"]>
    composites: {}
  }

  type EvaluationResultGetPayload<S extends boolean | null | undefined | EvaluationResultDefaultArgs> = $Result.GetResult<Prisma.$EvaluationResultPayload, S>

  type EvaluationResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EvaluationResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EvaluationResultCountAggregateInputType | true
    }

  export interface EvaluationResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EvaluationResult'], meta: { name: 'EvaluationResult' } }
    /**
     * Find zero or one EvaluationResult that matches the filter.
     * @param {EvaluationResultFindUniqueArgs} args - Arguments to find a EvaluationResult
     * @example
     * // Get one EvaluationResult
     * const evaluationResult = await prisma.evaluationResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EvaluationResultFindUniqueArgs>(args: SelectSubset<T, EvaluationResultFindUniqueArgs<ExtArgs>>): Prisma__EvaluationResultClient<$Result.GetResult<Prisma.$EvaluationResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EvaluationResult that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EvaluationResultFindUniqueOrThrowArgs} args - Arguments to find a EvaluationResult
     * @example
     * // Get one EvaluationResult
     * const evaluationResult = await prisma.evaluationResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EvaluationResultFindUniqueOrThrowArgs>(args: SelectSubset<T, EvaluationResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EvaluationResultClient<$Result.GetResult<Prisma.$EvaluationResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EvaluationResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationResultFindFirstArgs} args - Arguments to find a EvaluationResult
     * @example
     * // Get one EvaluationResult
     * const evaluationResult = await prisma.evaluationResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EvaluationResultFindFirstArgs>(args?: SelectSubset<T, EvaluationResultFindFirstArgs<ExtArgs>>): Prisma__EvaluationResultClient<$Result.GetResult<Prisma.$EvaluationResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EvaluationResult that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationResultFindFirstOrThrowArgs} args - Arguments to find a EvaluationResult
     * @example
     * // Get one EvaluationResult
     * const evaluationResult = await prisma.evaluationResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EvaluationResultFindFirstOrThrowArgs>(args?: SelectSubset<T, EvaluationResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__EvaluationResultClient<$Result.GetResult<Prisma.$EvaluationResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EvaluationResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EvaluationResults
     * const evaluationResults = await prisma.evaluationResult.findMany()
     * 
     * // Get first 10 EvaluationResults
     * const evaluationResults = await prisma.evaluationResult.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const evaluationResultWithIdOnly = await prisma.evaluationResult.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EvaluationResultFindManyArgs>(args?: SelectSubset<T, EvaluationResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EvaluationResult.
     * @param {EvaluationResultCreateArgs} args - Arguments to create a EvaluationResult.
     * @example
     * // Create one EvaluationResult
     * const EvaluationResult = await prisma.evaluationResult.create({
     *   data: {
     *     // ... data to create a EvaluationResult
     *   }
     * })
     * 
     */
    create<T extends EvaluationResultCreateArgs>(args: SelectSubset<T, EvaluationResultCreateArgs<ExtArgs>>): Prisma__EvaluationResultClient<$Result.GetResult<Prisma.$EvaluationResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EvaluationResults.
     * @param {EvaluationResultCreateManyArgs} args - Arguments to create many EvaluationResults.
     * @example
     * // Create many EvaluationResults
     * const evaluationResult = await prisma.evaluationResult.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EvaluationResultCreateManyArgs>(args?: SelectSubset<T, EvaluationResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EvaluationResult.
     * @param {EvaluationResultDeleteArgs} args - Arguments to delete one EvaluationResult.
     * @example
     * // Delete one EvaluationResult
     * const EvaluationResult = await prisma.evaluationResult.delete({
     *   where: {
     *     // ... filter to delete one EvaluationResult
     *   }
     * })
     * 
     */
    delete<T extends EvaluationResultDeleteArgs>(args: SelectSubset<T, EvaluationResultDeleteArgs<ExtArgs>>): Prisma__EvaluationResultClient<$Result.GetResult<Prisma.$EvaluationResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EvaluationResult.
     * @param {EvaluationResultUpdateArgs} args - Arguments to update one EvaluationResult.
     * @example
     * // Update one EvaluationResult
     * const evaluationResult = await prisma.evaluationResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EvaluationResultUpdateArgs>(args: SelectSubset<T, EvaluationResultUpdateArgs<ExtArgs>>): Prisma__EvaluationResultClient<$Result.GetResult<Prisma.$EvaluationResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EvaluationResults.
     * @param {EvaluationResultDeleteManyArgs} args - Arguments to filter EvaluationResults to delete.
     * @example
     * // Delete a few EvaluationResults
     * const { count } = await prisma.evaluationResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EvaluationResultDeleteManyArgs>(args?: SelectSubset<T, EvaluationResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EvaluationResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EvaluationResults
     * const evaluationResult = await prisma.evaluationResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EvaluationResultUpdateManyArgs>(args: SelectSubset<T, EvaluationResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EvaluationResult.
     * @param {EvaluationResultUpsertArgs} args - Arguments to update or create a EvaluationResult.
     * @example
     * // Update or create a EvaluationResult
     * const evaluationResult = await prisma.evaluationResult.upsert({
     *   create: {
     *     // ... data to create a EvaluationResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EvaluationResult we want to update
     *   }
     * })
     */
    upsert<T extends EvaluationResultUpsertArgs>(args: SelectSubset<T, EvaluationResultUpsertArgs<ExtArgs>>): Prisma__EvaluationResultClient<$Result.GetResult<Prisma.$EvaluationResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EvaluationResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationResultCountArgs} args - Arguments to filter EvaluationResults to count.
     * @example
     * // Count the number of EvaluationResults
     * const count = await prisma.evaluationResult.count({
     *   where: {
     *     // ... the filter for the EvaluationResults we want to count
     *   }
     * })
    **/
    count<T extends EvaluationResultCountArgs>(
      args?: Subset<T, EvaluationResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EvaluationResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EvaluationResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EvaluationResultAggregateArgs>(args: Subset<T, EvaluationResultAggregateArgs>): Prisma.PrismaPromise<GetEvaluationResultAggregateType<T>>

    /**
     * Group by EvaluationResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationResultGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EvaluationResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EvaluationResultGroupByArgs['orderBy'] }
        : { orderBy?: EvaluationResultGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EvaluationResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEvaluationResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EvaluationResult model
   */
  readonly fields: EvaluationResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EvaluationResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EvaluationResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    experiment<T extends ExperimentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExperimentDefaultArgs<ExtArgs>>): Prisma__ExperimentClient<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    testCase<T extends TestCaseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TestCaseDefaultArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EvaluationResult model
   */
  interface EvaluationResultFieldRefs {
    readonly id: FieldRef<"EvaluationResult", 'String'>
    readonly experimentId: FieldRef<"EvaluationResult", 'String'>
    readonly testCaseId: FieldRef<"EvaluationResult", 'String'>
    readonly actualOutput: FieldRef<"EvaluationResult", 'String'>
    readonly score: FieldRef<"EvaluationResult", 'Float'>
    readonly passed: FieldRef<"EvaluationResult", 'Boolean'>
    readonly latencyMs: FieldRef<"EvaluationResult", 'Int'>
    readonly ttftMs: FieldRef<"EvaluationResult", 'Int'>
    readonly inputTokens: FieldRef<"EvaluationResult", 'Int'>
    readonly outputTokens: FieldRef<"EvaluationResult", 'Int'>
    readonly cacheHit: FieldRef<"EvaluationResult", 'Boolean'>
    readonly reason: FieldRef<"EvaluationResult", 'String'>
    readonly createdAt: FieldRef<"EvaluationResult", 'DateTime'>
    readonly cachedInputTokens: FieldRef<"EvaluationResult", 'Int'>
    readonly estimatedCostUsd: FieldRef<"EvaluationResult", 'Float'>
    readonly totalTokens: FieldRef<"EvaluationResult", 'Int'>
    readonly uncachedEstimatedCostUsd: FieldRef<"EvaluationResult", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * EvaluationResult findUnique
   */
  export type EvaluationResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResult
     */
    select?: EvaluationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResult
     */
    omit?: EvaluationResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResultInclude<ExtArgs> | null
    /**
     * Filter, which EvaluationResult to fetch.
     */
    where: EvaluationResultWhereUniqueInput
  }

  /**
   * EvaluationResult findUniqueOrThrow
   */
  export type EvaluationResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResult
     */
    select?: EvaluationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResult
     */
    omit?: EvaluationResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResultInclude<ExtArgs> | null
    /**
     * Filter, which EvaluationResult to fetch.
     */
    where: EvaluationResultWhereUniqueInput
  }

  /**
   * EvaluationResult findFirst
   */
  export type EvaluationResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResult
     */
    select?: EvaluationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResult
     */
    omit?: EvaluationResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResultInclude<ExtArgs> | null
    /**
     * Filter, which EvaluationResult to fetch.
     */
    where?: EvaluationResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvaluationResults to fetch.
     */
    orderBy?: EvaluationResultOrderByWithRelationInput | EvaluationResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EvaluationResults.
     */
    cursor?: EvaluationResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvaluationResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvaluationResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EvaluationResults.
     */
    distinct?: EvaluationResultScalarFieldEnum | EvaluationResultScalarFieldEnum[]
  }

  /**
   * EvaluationResult findFirstOrThrow
   */
  export type EvaluationResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResult
     */
    select?: EvaluationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResult
     */
    omit?: EvaluationResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResultInclude<ExtArgs> | null
    /**
     * Filter, which EvaluationResult to fetch.
     */
    where?: EvaluationResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvaluationResults to fetch.
     */
    orderBy?: EvaluationResultOrderByWithRelationInput | EvaluationResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EvaluationResults.
     */
    cursor?: EvaluationResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvaluationResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvaluationResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EvaluationResults.
     */
    distinct?: EvaluationResultScalarFieldEnum | EvaluationResultScalarFieldEnum[]
  }

  /**
   * EvaluationResult findMany
   */
  export type EvaluationResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResult
     */
    select?: EvaluationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResult
     */
    omit?: EvaluationResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResultInclude<ExtArgs> | null
    /**
     * Filter, which EvaluationResults to fetch.
     */
    where?: EvaluationResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvaluationResults to fetch.
     */
    orderBy?: EvaluationResultOrderByWithRelationInput | EvaluationResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EvaluationResults.
     */
    cursor?: EvaluationResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvaluationResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvaluationResults.
     */
    skip?: number
    distinct?: EvaluationResultScalarFieldEnum | EvaluationResultScalarFieldEnum[]
  }

  /**
   * EvaluationResult create
   */
  export type EvaluationResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResult
     */
    select?: EvaluationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResult
     */
    omit?: EvaluationResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResultInclude<ExtArgs> | null
    /**
     * The data needed to create a EvaluationResult.
     */
    data: XOR<EvaluationResultCreateInput, EvaluationResultUncheckedCreateInput>
  }

  /**
   * EvaluationResult createMany
   */
  export type EvaluationResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EvaluationResults.
     */
    data: EvaluationResultCreateManyInput | EvaluationResultCreateManyInput[]
  }

  /**
   * EvaluationResult update
   */
  export type EvaluationResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResult
     */
    select?: EvaluationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResult
     */
    omit?: EvaluationResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResultInclude<ExtArgs> | null
    /**
     * The data needed to update a EvaluationResult.
     */
    data: XOR<EvaluationResultUpdateInput, EvaluationResultUncheckedUpdateInput>
    /**
     * Choose, which EvaluationResult to update.
     */
    where: EvaluationResultWhereUniqueInput
  }

  /**
   * EvaluationResult updateMany
   */
  export type EvaluationResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EvaluationResults.
     */
    data: XOR<EvaluationResultUpdateManyMutationInput, EvaluationResultUncheckedUpdateManyInput>
    /**
     * Filter which EvaluationResults to update
     */
    where?: EvaluationResultWhereInput
    /**
     * Limit how many EvaluationResults to update.
     */
    limit?: number
  }

  /**
   * EvaluationResult upsert
   */
  export type EvaluationResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResult
     */
    select?: EvaluationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResult
     */
    omit?: EvaluationResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResultInclude<ExtArgs> | null
    /**
     * The filter to search for the EvaluationResult to update in case it exists.
     */
    where: EvaluationResultWhereUniqueInput
    /**
     * In case the EvaluationResult found by the `where` argument doesn't exist, create a new EvaluationResult with this data.
     */
    create: XOR<EvaluationResultCreateInput, EvaluationResultUncheckedCreateInput>
    /**
     * In case the EvaluationResult was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EvaluationResultUpdateInput, EvaluationResultUncheckedUpdateInput>
  }

  /**
   * EvaluationResult delete
   */
  export type EvaluationResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResult
     */
    select?: EvaluationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResult
     */
    omit?: EvaluationResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResultInclude<ExtArgs> | null
    /**
     * Filter which EvaluationResult to delete.
     */
    where: EvaluationResultWhereUniqueInput
  }

  /**
   * EvaluationResult deleteMany
   */
  export type EvaluationResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EvaluationResults to delete
     */
    where?: EvaluationResultWhereInput
    /**
     * Limit how many EvaluationResults to delete.
     */
    limit?: number
  }

  /**
   * EvaluationResult without action
   */
  export type EvaluationResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResult
     */
    select?: EvaluationResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResult
     */
    omit?: EvaluationResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResultInclude<ExtArgs> | null
  }


  /**
   * Model GithubIntegration
   */

  export type AggregateGithubIntegration = {
    _count: GithubIntegrationCountAggregateOutputType | null
    _min: GithubIntegrationMinAggregateOutputType | null
    _max: GithubIntegrationMaxAggregateOutputType | null
  }

  export type GithubIntegrationMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    repositoryName: string | null
    repositoryId: string | null
    installationId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GithubIntegrationMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    repositoryName: string | null
    repositoryId: string | null
    installationId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GithubIntegrationCountAggregateOutputType = {
    id: number
    projectId: number
    repositoryName: number
    repositoryId: number
    installationId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GithubIntegrationMinAggregateInputType = {
    id?: true
    projectId?: true
    repositoryName?: true
    repositoryId?: true
    installationId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GithubIntegrationMaxAggregateInputType = {
    id?: true
    projectId?: true
    repositoryName?: true
    repositoryId?: true
    installationId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GithubIntegrationCountAggregateInputType = {
    id?: true
    projectId?: true
    repositoryName?: true
    repositoryId?: true
    installationId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GithubIntegrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GithubIntegration to aggregate.
     */
    where?: GithubIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GithubIntegrations to fetch.
     */
    orderBy?: GithubIntegrationOrderByWithRelationInput | GithubIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GithubIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GithubIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GithubIntegrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GithubIntegrations
    **/
    _count?: true | GithubIntegrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GithubIntegrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GithubIntegrationMaxAggregateInputType
  }

  export type GetGithubIntegrationAggregateType<T extends GithubIntegrationAggregateArgs> = {
        [P in keyof T & keyof AggregateGithubIntegration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGithubIntegration[P]>
      : GetScalarType<T[P], AggregateGithubIntegration[P]>
  }




  export type GithubIntegrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GithubIntegrationWhereInput
    orderBy?: GithubIntegrationOrderByWithAggregationInput | GithubIntegrationOrderByWithAggregationInput[]
    by: GithubIntegrationScalarFieldEnum[] | GithubIntegrationScalarFieldEnum
    having?: GithubIntegrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GithubIntegrationCountAggregateInputType | true
    _min?: GithubIntegrationMinAggregateInputType
    _max?: GithubIntegrationMaxAggregateInputType
  }

  export type GithubIntegrationGroupByOutputType = {
    id: string
    projectId: string
    repositoryName: string
    repositoryId: string | null
    installationId: string | null
    createdAt: Date
    updatedAt: Date
    _count: GithubIntegrationCountAggregateOutputType | null
    _min: GithubIntegrationMinAggregateOutputType | null
    _max: GithubIntegrationMaxAggregateOutputType | null
  }

  type GetGithubIntegrationGroupByPayload<T extends GithubIntegrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GithubIntegrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GithubIntegrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GithubIntegrationGroupByOutputType[P]>
            : GetScalarType<T[P], GithubIntegrationGroupByOutputType[P]>
        }
      >
    >


  export type GithubIntegrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    repositoryName?: boolean
    repositoryId?: boolean
    installationId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["githubIntegration"]>



  export type GithubIntegrationSelectScalar = {
    id?: boolean
    projectId?: boolean
    repositoryName?: boolean
    repositoryId?: boolean
    installationId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GithubIntegrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "repositoryName" | "repositoryId" | "installationId" | "createdAt" | "updatedAt", ExtArgs["result"]["githubIntegration"]>
  export type GithubIntegrationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $GithubIntegrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GithubIntegration"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      repositoryName: string
      repositoryId: string | null
      installationId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["githubIntegration"]>
    composites: {}
  }

  type GithubIntegrationGetPayload<S extends boolean | null | undefined | GithubIntegrationDefaultArgs> = $Result.GetResult<Prisma.$GithubIntegrationPayload, S>

  type GithubIntegrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GithubIntegrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GithubIntegrationCountAggregateInputType | true
    }

  export interface GithubIntegrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GithubIntegration'], meta: { name: 'GithubIntegration' } }
    /**
     * Find zero or one GithubIntegration that matches the filter.
     * @param {GithubIntegrationFindUniqueArgs} args - Arguments to find a GithubIntegration
     * @example
     * // Get one GithubIntegration
     * const githubIntegration = await prisma.githubIntegration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GithubIntegrationFindUniqueArgs>(args: SelectSubset<T, GithubIntegrationFindUniqueArgs<ExtArgs>>): Prisma__GithubIntegrationClient<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GithubIntegration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GithubIntegrationFindUniqueOrThrowArgs} args - Arguments to find a GithubIntegration
     * @example
     * // Get one GithubIntegration
     * const githubIntegration = await prisma.githubIntegration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GithubIntegrationFindUniqueOrThrowArgs>(args: SelectSubset<T, GithubIntegrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GithubIntegrationClient<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GithubIntegration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubIntegrationFindFirstArgs} args - Arguments to find a GithubIntegration
     * @example
     * // Get one GithubIntegration
     * const githubIntegration = await prisma.githubIntegration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GithubIntegrationFindFirstArgs>(args?: SelectSubset<T, GithubIntegrationFindFirstArgs<ExtArgs>>): Prisma__GithubIntegrationClient<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GithubIntegration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubIntegrationFindFirstOrThrowArgs} args - Arguments to find a GithubIntegration
     * @example
     * // Get one GithubIntegration
     * const githubIntegration = await prisma.githubIntegration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GithubIntegrationFindFirstOrThrowArgs>(args?: SelectSubset<T, GithubIntegrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__GithubIntegrationClient<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GithubIntegrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubIntegrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GithubIntegrations
     * const githubIntegrations = await prisma.githubIntegration.findMany()
     * 
     * // Get first 10 GithubIntegrations
     * const githubIntegrations = await prisma.githubIntegration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const githubIntegrationWithIdOnly = await prisma.githubIntegration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GithubIntegrationFindManyArgs>(args?: SelectSubset<T, GithubIntegrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GithubIntegration.
     * @param {GithubIntegrationCreateArgs} args - Arguments to create a GithubIntegration.
     * @example
     * // Create one GithubIntegration
     * const GithubIntegration = await prisma.githubIntegration.create({
     *   data: {
     *     // ... data to create a GithubIntegration
     *   }
     * })
     * 
     */
    create<T extends GithubIntegrationCreateArgs>(args: SelectSubset<T, GithubIntegrationCreateArgs<ExtArgs>>): Prisma__GithubIntegrationClient<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GithubIntegrations.
     * @param {GithubIntegrationCreateManyArgs} args - Arguments to create many GithubIntegrations.
     * @example
     * // Create many GithubIntegrations
     * const githubIntegration = await prisma.githubIntegration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GithubIntegrationCreateManyArgs>(args?: SelectSubset<T, GithubIntegrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a GithubIntegration.
     * @param {GithubIntegrationDeleteArgs} args - Arguments to delete one GithubIntegration.
     * @example
     * // Delete one GithubIntegration
     * const GithubIntegration = await prisma.githubIntegration.delete({
     *   where: {
     *     // ... filter to delete one GithubIntegration
     *   }
     * })
     * 
     */
    delete<T extends GithubIntegrationDeleteArgs>(args: SelectSubset<T, GithubIntegrationDeleteArgs<ExtArgs>>): Prisma__GithubIntegrationClient<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GithubIntegration.
     * @param {GithubIntegrationUpdateArgs} args - Arguments to update one GithubIntegration.
     * @example
     * // Update one GithubIntegration
     * const githubIntegration = await prisma.githubIntegration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GithubIntegrationUpdateArgs>(args: SelectSubset<T, GithubIntegrationUpdateArgs<ExtArgs>>): Prisma__GithubIntegrationClient<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GithubIntegrations.
     * @param {GithubIntegrationDeleteManyArgs} args - Arguments to filter GithubIntegrations to delete.
     * @example
     * // Delete a few GithubIntegrations
     * const { count } = await prisma.githubIntegration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GithubIntegrationDeleteManyArgs>(args?: SelectSubset<T, GithubIntegrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GithubIntegrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubIntegrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GithubIntegrations
     * const githubIntegration = await prisma.githubIntegration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GithubIntegrationUpdateManyArgs>(args: SelectSubset<T, GithubIntegrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GithubIntegration.
     * @param {GithubIntegrationUpsertArgs} args - Arguments to update or create a GithubIntegration.
     * @example
     * // Update or create a GithubIntegration
     * const githubIntegration = await prisma.githubIntegration.upsert({
     *   create: {
     *     // ... data to create a GithubIntegration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GithubIntegration we want to update
     *   }
     * })
     */
    upsert<T extends GithubIntegrationUpsertArgs>(args: SelectSubset<T, GithubIntegrationUpsertArgs<ExtArgs>>): Prisma__GithubIntegrationClient<$Result.GetResult<Prisma.$GithubIntegrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GithubIntegrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubIntegrationCountArgs} args - Arguments to filter GithubIntegrations to count.
     * @example
     * // Count the number of GithubIntegrations
     * const count = await prisma.githubIntegration.count({
     *   where: {
     *     // ... the filter for the GithubIntegrations we want to count
     *   }
     * })
    **/
    count<T extends GithubIntegrationCountArgs>(
      args?: Subset<T, GithubIntegrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GithubIntegrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GithubIntegration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubIntegrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GithubIntegrationAggregateArgs>(args: Subset<T, GithubIntegrationAggregateArgs>): Prisma.PrismaPromise<GetGithubIntegrationAggregateType<T>>

    /**
     * Group by GithubIntegration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubIntegrationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GithubIntegrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GithubIntegrationGroupByArgs['orderBy'] }
        : { orderBy?: GithubIntegrationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GithubIntegrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGithubIntegrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GithubIntegration model
   */
  readonly fields: GithubIntegrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GithubIntegration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GithubIntegrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GithubIntegration model
   */
  interface GithubIntegrationFieldRefs {
    readonly id: FieldRef<"GithubIntegration", 'String'>
    readonly projectId: FieldRef<"GithubIntegration", 'String'>
    readonly repositoryName: FieldRef<"GithubIntegration", 'String'>
    readonly repositoryId: FieldRef<"GithubIntegration", 'String'>
    readonly installationId: FieldRef<"GithubIntegration", 'String'>
    readonly createdAt: FieldRef<"GithubIntegration", 'DateTime'>
    readonly updatedAt: FieldRef<"GithubIntegration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GithubIntegration findUnique
   */
  export type GithubIntegrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
    /**
     * Filter, which GithubIntegration to fetch.
     */
    where: GithubIntegrationWhereUniqueInput
  }

  /**
   * GithubIntegration findUniqueOrThrow
   */
  export type GithubIntegrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
    /**
     * Filter, which GithubIntegration to fetch.
     */
    where: GithubIntegrationWhereUniqueInput
  }

  /**
   * GithubIntegration findFirst
   */
  export type GithubIntegrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
    /**
     * Filter, which GithubIntegration to fetch.
     */
    where?: GithubIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GithubIntegrations to fetch.
     */
    orderBy?: GithubIntegrationOrderByWithRelationInput | GithubIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GithubIntegrations.
     */
    cursor?: GithubIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GithubIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GithubIntegrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GithubIntegrations.
     */
    distinct?: GithubIntegrationScalarFieldEnum | GithubIntegrationScalarFieldEnum[]
  }

  /**
   * GithubIntegration findFirstOrThrow
   */
  export type GithubIntegrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
    /**
     * Filter, which GithubIntegration to fetch.
     */
    where?: GithubIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GithubIntegrations to fetch.
     */
    orderBy?: GithubIntegrationOrderByWithRelationInput | GithubIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GithubIntegrations.
     */
    cursor?: GithubIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GithubIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GithubIntegrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GithubIntegrations.
     */
    distinct?: GithubIntegrationScalarFieldEnum | GithubIntegrationScalarFieldEnum[]
  }

  /**
   * GithubIntegration findMany
   */
  export type GithubIntegrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
    /**
     * Filter, which GithubIntegrations to fetch.
     */
    where?: GithubIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GithubIntegrations to fetch.
     */
    orderBy?: GithubIntegrationOrderByWithRelationInput | GithubIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GithubIntegrations.
     */
    cursor?: GithubIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GithubIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GithubIntegrations.
     */
    skip?: number
    distinct?: GithubIntegrationScalarFieldEnum | GithubIntegrationScalarFieldEnum[]
  }

  /**
   * GithubIntegration create
   */
  export type GithubIntegrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
    /**
     * The data needed to create a GithubIntegration.
     */
    data: XOR<GithubIntegrationCreateInput, GithubIntegrationUncheckedCreateInput>
  }

  /**
   * GithubIntegration createMany
   */
  export type GithubIntegrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GithubIntegrations.
     */
    data: GithubIntegrationCreateManyInput | GithubIntegrationCreateManyInput[]
  }

  /**
   * GithubIntegration update
   */
  export type GithubIntegrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
    /**
     * The data needed to update a GithubIntegration.
     */
    data: XOR<GithubIntegrationUpdateInput, GithubIntegrationUncheckedUpdateInput>
    /**
     * Choose, which GithubIntegration to update.
     */
    where: GithubIntegrationWhereUniqueInput
  }

  /**
   * GithubIntegration updateMany
   */
  export type GithubIntegrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GithubIntegrations.
     */
    data: XOR<GithubIntegrationUpdateManyMutationInput, GithubIntegrationUncheckedUpdateManyInput>
    /**
     * Filter which GithubIntegrations to update
     */
    where?: GithubIntegrationWhereInput
    /**
     * Limit how many GithubIntegrations to update.
     */
    limit?: number
  }

  /**
   * GithubIntegration upsert
   */
  export type GithubIntegrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
    /**
     * The filter to search for the GithubIntegration to update in case it exists.
     */
    where: GithubIntegrationWhereUniqueInput
    /**
     * In case the GithubIntegration found by the `where` argument doesn't exist, create a new GithubIntegration with this data.
     */
    create: XOR<GithubIntegrationCreateInput, GithubIntegrationUncheckedCreateInput>
    /**
     * In case the GithubIntegration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GithubIntegrationUpdateInput, GithubIntegrationUncheckedUpdateInput>
  }

  /**
   * GithubIntegration delete
   */
  export type GithubIntegrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
    /**
     * Filter which GithubIntegration to delete.
     */
    where: GithubIntegrationWhereUniqueInput
  }

  /**
   * GithubIntegration deleteMany
   */
  export type GithubIntegrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GithubIntegrations to delete
     */
    where?: GithubIntegrationWhereInput
    /**
     * Limit how many GithubIntegrations to delete.
     */
    limit?: number
  }

  /**
   * GithubIntegration without action
   */
  export type GithubIntegrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubIntegration
     */
    select?: GithubIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubIntegration
     */
    omit?: GithubIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubIntegrationInclude<ExtArgs> | null
  }


  /**
   * Model Baseline
   */

  export type AggregateBaseline = {
    _count: BaselineCountAggregateOutputType | null
    _min: BaselineMinAggregateOutputType | null
    _max: BaselineMaxAggregateOutputType | null
  }

  export type BaselineMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    experimentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BaselineMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    experimentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BaselineCountAggregateOutputType = {
    id: number
    projectId: number
    experimentId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BaselineMinAggregateInputType = {
    id?: true
    projectId?: true
    experimentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BaselineMaxAggregateInputType = {
    id?: true
    projectId?: true
    experimentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BaselineCountAggregateInputType = {
    id?: true
    projectId?: true
    experimentId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BaselineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Baseline to aggregate.
     */
    where?: BaselineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Baselines to fetch.
     */
    orderBy?: BaselineOrderByWithRelationInput | BaselineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BaselineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Baselines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Baselines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Baselines
    **/
    _count?: true | BaselineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BaselineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BaselineMaxAggregateInputType
  }

  export type GetBaselineAggregateType<T extends BaselineAggregateArgs> = {
        [P in keyof T & keyof AggregateBaseline]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBaseline[P]>
      : GetScalarType<T[P], AggregateBaseline[P]>
  }




  export type BaselineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BaselineWhereInput
    orderBy?: BaselineOrderByWithAggregationInput | BaselineOrderByWithAggregationInput[]
    by: BaselineScalarFieldEnum[] | BaselineScalarFieldEnum
    having?: BaselineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BaselineCountAggregateInputType | true
    _min?: BaselineMinAggregateInputType
    _max?: BaselineMaxAggregateInputType
  }

  export type BaselineGroupByOutputType = {
    id: string
    projectId: string
    experimentId: string
    createdAt: Date
    updatedAt: Date
    _count: BaselineCountAggregateOutputType | null
    _min: BaselineMinAggregateOutputType | null
    _max: BaselineMaxAggregateOutputType | null
  }

  type GetBaselineGroupByPayload<T extends BaselineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BaselineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BaselineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BaselineGroupByOutputType[P]>
            : GetScalarType<T[P], BaselineGroupByOutputType[P]>
        }
      >
    >


  export type BaselineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    experimentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["baseline"]>



  export type BaselineSelectScalar = {
    id?: boolean
    projectId?: boolean
    experimentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BaselineOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "experimentId" | "createdAt" | "updatedAt", ExtArgs["result"]["baseline"]>
  export type BaselineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $BaselinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Baseline"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      experimentId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["baseline"]>
    composites: {}
  }

  type BaselineGetPayload<S extends boolean | null | undefined | BaselineDefaultArgs> = $Result.GetResult<Prisma.$BaselinePayload, S>

  type BaselineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BaselineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BaselineCountAggregateInputType | true
    }

  export interface BaselineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Baseline'], meta: { name: 'Baseline' } }
    /**
     * Find zero or one Baseline that matches the filter.
     * @param {BaselineFindUniqueArgs} args - Arguments to find a Baseline
     * @example
     * // Get one Baseline
     * const baseline = await prisma.baseline.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BaselineFindUniqueArgs>(args: SelectSubset<T, BaselineFindUniqueArgs<ExtArgs>>): Prisma__BaselineClient<$Result.GetResult<Prisma.$BaselinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Baseline that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BaselineFindUniqueOrThrowArgs} args - Arguments to find a Baseline
     * @example
     * // Get one Baseline
     * const baseline = await prisma.baseline.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BaselineFindUniqueOrThrowArgs>(args: SelectSubset<T, BaselineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BaselineClient<$Result.GetResult<Prisma.$BaselinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Baseline that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaselineFindFirstArgs} args - Arguments to find a Baseline
     * @example
     * // Get one Baseline
     * const baseline = await prisma.baseline.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BaselineFindFirstArgs>(args?: SelectSubset<T, BaselineFindFirstArgs<ExtArgs>>): Prisma__BaselineClient<$Result.GetResult<Prisma.$BaselinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Baseline that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaselineFindFirstOrThrowArgs} args - Arguments to find a Baseline
     * @example
     * // Get one Baseline
     * const baseline = await prisma.baseline.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BaselineFindFirstOrThrowArgs>(args?: SelectSubset<T, BaselineFindFirstOrThrowArgs<ExtArgs>>): Prisma__BaselineClient<$Result.GetResult<Prisma.$BaselinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Baselines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaselineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Baselines
     * const baselines = await prisma.baseline.findMany()
     * 
     * // Get first 10 Baselines
     * const baselines = await prisma.baseline.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const baselineWithIdOnly = await prisma.baseline.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BaselineFindManyArgs>(args?: SelectSubset<T, BaselineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BaselinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Baseline.
     * @param {BaselineCreateArgs} args - Arguments to create a Baseline.
     * @example
     * // Create one Baseline
     * const Baseline = await prisma.baseline.create({
     *   data: {
     *     // ... data to create a Baseline
     *   }
     * })
     * 
     */
    create<T extends BaselineCreateArgs>(args: SelectSubset<T, BaselineCreateArgs<ExtArgs>>): Prisma__BaselineClient<$Result.GetResult<Prisma.$BaselinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Baselines.
     * @param {BaselineCreateManyArgs} args - Arguments to create many Baselines.
     * @example
     * // Create many Baselines
     * const baseline = await prisma.baseline.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BaselineCreateManyArgs>(args?: SelectSubset<T, BaselineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Baseline.
     * @param {BaselineDeleteArgs} args - Arguments to delete one Baseline.
     * @example
     * // Delete one Baseline
     * const Baseline = await prisma.baseline.delete({
     *   where: {
     *     // ... filter to delete one Baseline
     *   }
     * })
     * 
     */
    delete<T extends BaselineDeleteArgs>(args: SelectSubset<T, BaselineDeleteArgs<ExtArgs>>): Prisma__BaselineClient<$Result.GetResult<Prisma.$BaselinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Baseline.
     * @param {BaselineUpdateArgs} args - Arguments to update one Baseline.
     * @example
     * // Update one Baseline
     * const baseline = await prisma.baseline.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BaselineUpdateArgs>(args: SelectSubset<T, BaselineUpdateArgs<ExtArgs>>): Prisma__BaselineClient<$Result.GetResult<Prisma.$BaselinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Baselines.
     * @param {BaselineDeleteManyArgs} args - Arguments to filter Baselines to delete.
     * @example
     * // Delete a few Baselines
     * const { count } = await prisma.baseline.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BaselineDeleteManyArgs>(args?: SelectSubset<T, BaselineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Baselines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaselineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Baselines
     * const baseline = await prisma.baseline.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BaselineUpdateManyArgs>(args: SelectSubset<T, BaselineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Baseline.
     * @param {BaselineUpsertArgs} args - Arguments to update or create a Baseline.
     * @example
     * // Update or create a Baseline
     * const baseline = await prisma.baseline.upsert({
     *   create: {
     *     // ... data to create a Baseline
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Baseline we want to update
     *   }
     * })
     */
    upsert<T extends BaselineUpsertArgs>(args: SelectSubset<T, BaselineUpsertArgs<ExtArgs>>): Prisma__BaselineClient<$Result.GetResult<Prisma.$BaselinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Baselines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaselineCountArgs} args - Arguments to filter Baselines to count.
     * @example
     * // Count the number of Baselines
     * const count = await prisma.baseline.count({
     *   where: {
     *     // ... the filter for the Baselines we want to count
     *   }
     * })
    **/
    count<T extends BaselineCountArgs>(
      args?: Subset<T, BaselineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BaselineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Baseline.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaselineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BaselineAggregateArgs>(args: Subset<T, BaselineAggregateArgs>): Prisma.PrismaPromise<GetBaselineAggregateType<T>>

    /**
     * Group by Baseline.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaselineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BaselineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BaselineGroupByArgs['orderBy'] }
        : { orderBy?: BaselineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BaselineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBaselineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Baseline model
   */
  readonly fields: BaselineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Baseline.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BaselineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Baseline model
   */
  interface BaselineFieldRefs {
    readonly id: FieldRef<"Baseline", 'String'>
    readonly projectId: FieldRef<"Baseline", 'String'>
    readonly experimentId: FieldRef<"Baseline", 'String'>
    readonly createdAt: FieldRef<"Baseline", 'DateTime'>
    readonly updatedAt: FieldRef<"Baseline", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Baseline findUnique
   */
  export type BaselineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baseline
     */
    select?: BaselineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baseline
     */
    omit?: BaselineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaselineInclude<ExtArgs> | null
    /**
     * Filter, which Baseline to fetch.
     */
    where: BaselineWhereUniqueInput
  }

  /**
   * Baseline findUniqueOrThrow
   */
  export type BaselineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baseline
     */
    select?: BaselineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baseline
     */
    omit?: BaselineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaselineInclude<ExtArgs> | null
    /**
     * Filter, which Baseline to fetch.
     */
    where: BaselineWhereUniqueInput
  }

  /**
   * Baseline findFirst
   */
  export type BaselineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baseline
     */
    select?: BaselineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baseline
     */
    omit?: BaselineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaselineInclude<ExtArgs> | null
    /**
     * Filter, which Baseline to fetch.
     */
    where?: BaselineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Baselines to fetch.
     */
    orderBy?: BaselineOrderByWithRelationInput | BaselineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Baselines.
     */
    cursor?: BaselineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Baselines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Baselines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Baselines.
     */
    distinct?: BaselineScalarFieldEnum | BaselineScalarFieldEnum[]
  }

  /**
   * Baseline findFirstOrThrow
   */
  export type BaselineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baseline
     */
    select?: BaselineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baseline
     */
    omit?: BaselineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaselineInclude<ExtArgs> | null
    /**
     * Filter, which Baseline to fetch.
     */
    where?: BaselineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Baselines to fetch.
     */
    orderBy?: BaselineOrderByWithRelationInput | BaselineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Baselines.
     */
    cursor?: BaselineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Baselines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Baselines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Baselines.
     */
    distinct?: BaselineScalarFieldEnum | BaselineScalarFieldEnum[]
  }

  /**
   * Baseline findMany
   */
  export type BaselineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baseline
     */
    select?: BaselineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baseline
     */
    omit?: BaselineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaselineInclude<ExtArgs> | null
    /**
     * Filter, which Baselines to fetch.
     */
    where?: BaselineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Baselines to fetch.
     */
    orderBy?: BaselineOrderByWithRelationInput | BaselineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Baselines.
     */
    cursor?: BaselineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Baselines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Baselines.
     */
    skip?: number
    distinct?: BaselineScalarFieldEnum | BaselineScalarFieldEnum[]
  }

  /**
   * Baseline create
   */
  export type BaselineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baseline
     */
    select?: BaselineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baseline
     */
    omit?: BaselineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaselineInclude<ExtArgs> | null
    /**
     * The data needed to create a Baseline.
     */
    data: XOR<BaselineCreateInput, BaselineUncheckedCreateInput>
  }

  /**
   * Baseline createMany
   */
  export type BaselineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Baselines.
     */
    data: BaselineCreateManyInput | BaselineCreateManyInput[]
  }

  /**
   * Baseline update
   */
  export type BaselineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baseline
     */
    select?: BaselineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baseline
     */
    omit?: BaselineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaselineInclude<ExtArgs> | null
    /**
     * The data needed to update a Baseline.
     */
    data: XOR<BaselineUpdateInput, BaselineUncheckedUpdateInput>
    /**
     * Choose, which Baseline to update.
     */
    where: BaselineWhereUniqueInput
  }

  /**
   * Baseline updateMany
   */
  export type BaselineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Baselines.
     */
    data: XOR<BaselineUpdateManyMutationInput, BaselineUncheckedUpdateManyInput>
    /**
     * Filter which Baselines to update
     */
    where?: BaselineWhereInput
    /**
     * Limit how many Baselines to update.
     */
    limit?: number
  }

  /**
   * Baseline upsert
   */
  export type BaselineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baseline
     */
    select?: BaselineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baseline
     */
    omit?: BaselineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaselineInclude<ExtArgs> | null
    /**
     * The filter to search for the Baseline to update in case it exists.
     */
    where: BaselineWhereUniqueInput
    /**
     * In case the Baseline found by the `where` argument doesn't exist, create a new Baseline with this data.
     */
    create: XOR<BaselineCreateInput, BaselineUncheckedCreateInput>
    /**
     * In case the Baseline was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BaselineUpdateInput, BaselineUncheckedUpdateInput>
  }

  /**
   * Baseline delete
   */
  export type BaselineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baseline
     */
    select?: BaselineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baseline
     */
    omit?: BaselineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaselineInclude<ExtArgs> | null
    /**
     * Filter which Baseline to delete.
     */
    where: BaselineWhereUniqueInput
  }

  /**
   * Baseline deleteMany
   */
  export type BaselineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Baselines to delete
     */
    where?: BaselineWhereInput
    /**
     * Limit how many Baselines to delete.
     */
    limit?: number
  }

  /**
   * Baseline without action
   */
  export type BaselineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baseline
     */
    select?: BaselineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baseline
     */
    omit?: BaselineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaselineInclude<ExtArgs> | null
  }


  /**
   * Model ProjectCiToken
   */

  export type AggregateProjectCiToken = {
    _count: ProjectCiTokenCountAggregateOutputType | null
    _min: ProjectCiTokenMinAggregateOutputType | null
    _max: ProjectCiTokenMaxAggregateOutputType | null
  }

  export type ProjectCiTokenMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    tokenHash: string | null
    tokenPrefix: string | null
    createdAt: Date | null
    revokedAt: Date | null
  }

  export type ProjectCiTokenMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    tokenHash: string | null
    tokenPrefix: string | null
    createdAt: Date | null
    revokedAt: Date | null
  }

  export type ProjectCiTokenCountAggregateOutputType = {
    id: number
    projectId: number
    tokenHash: number
    tokenPrefix: number
    createdAt: number
    revokedAt: number
    _all: number
  }


  export type ProjectCiTokenMinAggregateInputType = {
    id?: true
    projectId?: true
    tokenHash?: true
    tokenPrefix?: true
    createdAt?: true
    revokedAt?: true
  }

  export type ProjectCiTokenMaxAggregateInputType = {
    id?: true
    projectId?: true
    tokenHash?: true
    tokenPrefix?: true
    createdAt?: true
    revokedAt?: true
  }

  export type ProjectCiTokenCountAggregateInputType = {
    id?: true
    projectId?: true
    tokenHash?: true
    tokenPrefix?: true
    createdAt?: true
    revokedAt?: true
    _all?: true
  }

  export type ProjectCiTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectCiToken to aggregate.
     */
    where?: ProjectCiTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectCiTokens to fetch.
     */
    orderBy?: ProjectCiTokenOrderByWithRelationInput | ProjectCiTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectCiTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectCiTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectCiTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectCiTokens
    **/
    _count?: true | ProjectCiTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectCiTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectCiTokenMaxAggregateInputType
  }

  export type GetProjectCiTokenAggregateType<T extends ProjectCiTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectCiToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectCiToken[P]>
      : GetScalarType<T[P], AggregateProjectCiToken[P]>
  }




  export type ProjectCiTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectCiTokenWhereInput
    orderBy?: ProjectCiTokenOrderByWithAggregationInput | ProjectCiTokenOrderByWithAggregationInput[]
    by: ProjectCiTokenScalarFieldEnum[] | ProjectCiTokenScalarFieldEnum
    having?: ProjectCiTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCiTokenCountAggregateInputType | true
    _min?: ProjectCiTokenMinAggregateInputType
    _max?: ProjectCiTokenMaxAggregateInputType
  }

  export type ProjectCiTokenGroupByOutputType = {
    id: string
    projectId: string
    tokenHash: string
    tokenPrefix: string
    createdAt: Date
    revokedAt: Date | null
    _count: ProjectCiTokenCountAggregateOutputType | null
    _min: ProjectCiTokenMinAggregateOutputType | null
    _max: ProjectCiTokenMaxAggregateOutputType | null
  }

  type GetProjectCiTokenGroupByPayload<T extends ProjectCiTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectCiTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectCiTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectCiTokenGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectCiTokenGroupByOutputType[P]>
        }
      >
    >


  export type ProjectCiTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    tokenHash?: boolean
    tokenPrefix?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectCiToken"]>



  export type ProjectCiTokenSelectScalar = {
    id?: boolean
    projectId?: boolean
    tokenHash?: boolean
    tokenPrefix?: boolean
    createdAt?: boolean
    revokedAt?: boolean
  }

  export type ProjectCiTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "tokenHash" | "tokenPrefix" | "createdAt" | "revokedAt", ExtArgs["result"]["projectCiToken"]>
  export type ProjectCiTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ProjectCiTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectCiToken"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      tokenHash: string
      tokenPrefix: string
      createdAt: Date
      revokedAt: Date | null
    }, ExtArgs["result"]["projectCiToken"]>
    composites: {}
  }

  type ProjectCiTokenGetPayload<S extends boolean | null | undefined | ProjectCiTokenDefaultArgs> = $Result.GetResult<Prisma.$ProjectCiTokenPayload, S>

  type ProjectCiTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectCiTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCiTokenCountAggregateInputType | true
    }

  export interface ProjectCiTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectCiToken'], meta: { name: 'ProjectCiToken' } }
    /**
     * Find zero or one ProjectCiToken that matches the filter.
     * @param {ProjectCiTokenFindUniqueArgs} args - Arguments to find a ProjectCiToken
     * @example
     * // Get one ProjectCiToken
     * const projectCiToken = await prisma.projectCiToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectCiTokenFindUniqueArgs>(args: SelectSubset<T, ProjectCiTokenFindUniqueArgs<ExtArgs>>): Prisma__ProjectCiTokenClient<$Result.GetResult<Prisma.$ProjectCiTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectCiToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectCiTokenFindUniqueOrThrowArgs} args - Arguments to find a ProjectCiToken
     * @example
     * // Get one ProjectCiToken
     * const projectCiToken = await prisma.projectCiToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectCiTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectCiTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectCiTokenClient<$Result.GetResult<Prisma.$ProjectCiTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectCiToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCiTokenFindFirstArgs} args - Arguments to find a ProjectCiToken
     * @example
     * // Get one ProjectCiToken
     * const projectCiToken = await prisma.projectCiToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectCiTokenFindFirstArgs>(args?: SelectSubset<T, ProjectCiTokenFindFirstArgs<ExtArgs>>): Prisma__ProjectCiTokenClient<$Result.GetResult<Prisma.$ProjectCiTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectCiToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCiTokenFindFirstOrThrowArgs} args - Arguments to find a ProjectCiToken
     * @example
     * // Get one ProjectCiToken
     * const projectCiToken = await prisma.projectCiToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectCiTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectCiTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectCiTokenClient<$Result.GetResult<Prisma.$ProjectCiTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectCiTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCiTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectCiTokens
     * const projectCiTokens = await prisma.projectCiToken.findMany()
     * 
     * // Get first 10 ProjectCiTokens
     * const projectCiTokens = await prisma.projectCiToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectCiTokenWithIdOnly = await prisma.projectCiToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectCiTokenFindManyArgs>(args?: SelectSubset<T, ProjectCiTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectCiTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectCiToken.
     * @param {ProjectCiTokenCreateArgs} args - Arguments to create a ProjectCiToken.
     * @example
     * // Create one ProjectCiToken
     * const ProjectCiToken = await prisma.projectCiToken.create({
     *   data: {
     *     // ... data to create a ProjectCiToken
     *   }
     * })
     * 
     */
    create<T extends ProjectCiTokenCreateArgs>(args: SelectSubset<T, ProjectCiTokenCreateArgs<ExtArgs>>): Prisma__ProjectCiTokenClient<$Result.GetResult<Prisma.$ProjectCiTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectCiTokens.
     * @param {ProjectCiTokenCreateManyArgs} args - Arguments to create many ProjectCiTokens.
     * @example
     * // Create many ProjectCiTokens
     * const projectCiToken = await prisma.projectCiToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCiTokenCreateManyArgs>(args?: SelectSubset<T, ProjectCiTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProjectCiToken.
     * @param {ProjectCiTokenDeleteArgs} args - Arguments to delete one ProjectCiToken.
     * @example
     * // Delete one ProjectCiToken
     * const ProjectCiToken = await prisma.projectCiToken.delete({
     *   where: {
     *     // ... filter to delete one ProjectCiToken
     *   }
     * })
     * 
     */
    delete<T extends ProjectCiTokenDeleteArgs>(args: SelectSubset<T, ProjectCiTokenDeleteArgs<ExtArgs>>): Prisma__ProjectCiTokenClient<$Result.GetResult<Prisma.$ProjectCiTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectCiToken.
     * @param {ProjectCiTokenUpdateArgs} args - Arguments to update one ProjectCiToken.
     * @example
     * // Update one ProjectCiToken
     * const projectCiToken = await prisma.projectCiToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectCiTokenUpdateArgs>(args: SelectSubset<T, ProjectCiTokenUpdateArgs<ExtArgs>>): Prisma__ProjectCiTokenClient<$Result.GetResult<Prisma.$ProjectCiTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectCiTokens.
     * @param {ProjectCiTokenDeleteManyArgs} args - Arguments to filter ProjectCiTokens to delete.
     * @example
     * // Delete a few ProjectCiTokens
     * const { count } = await prisma.projectCiToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectCiTokenDeleteManyArgs>(args?: SelectSubset<T, ProjectCiTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectCiTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCiTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectCiTokens
     * const projectCiToken = await prisma.projectCiToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectCiTokenUpdateManyArgs>(args: SelectSubset<T, ProjectCiTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProjectCiToken.
     * @param {ProjectCiTokenUpsertArgs} args - Arguments to update or create a ProjectCiToken.
     * @example
     * // Update or create a ProjectCiToken
     * const projectCiToken = await prisma.projectCiToken.upsert({
     *   create: {
     *     // ... data to create a ProjectCiToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectCiToken we want to update
     *   }
     * })
     */
    upsert<T extends ProjectCiTokenUpsertArgs>(args: SelectSubset<T, ProjectCiTokenUpsertArgs<ExtArgs>>): Prisma__ProjectCiTokenClient<$Result.GetResult<Prisma.$ProjectCiTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectCiTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCiTokenCountArgs} args - Arguments to filter ProjectCiTokens to count.
     * @example
     * // Count the number of ProjectCiTokens
     * const count = await prisma.projectCiToken.count({
     *   where: {
     *     // ... the filter for the ProjectCiTokens we want to count
     *   }
     * })
    **/
    count<T extends ProjectCiTokenCountArgs>(
      args?: Subset<T, ProjectCiTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCiTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectCiToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCiTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectCiTokenAggregateArgs>(args: Subset<T, ProjectCiTokenAggregateArgs>): Prisma.PrismaPromise<GetProjectCiTokenAggregateType<T>>

    /**
     * Group by ProjectCiToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCiTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectCiTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectCiTokenGroupByArgs['orderBy'] }
        : { orderBy?: ProjectCiTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectCiTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectCiTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectCiToken model
   */
  readonly fields: ProjectCiTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectCiToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectCiTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectCiToken model
   */
  interface ProjectCiTokenFieldRefs {
    readonly id: FieldRef<"ProjectCiToken", 'String'>
    readonly projectId: FieldRef<"ProjectCiToken", 'String'>
    readonly tokenHash: FieldRef<"ProjectCiToken", 'String'>
    readonly tokenPrefix: FieldRef<"ProjectCiToken", 'String'>
    readonly createdAt: FieldRef<"ProjectCiToken", 'DateTime'>
    readonly revokedAt: FieldRef<"ProjectCiToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectCiToken findUnique
   */
  export type ProjectCiTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCiToken
     */
    select?: ProjectCiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectCiToken
     */
    omit?: ProjectCiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectCiTokenInclude<ExtArgs> | null
    /**
     * Filter, which ProjectCiToken to fetch.
     */
    where: ProjectCiTokenWhereUniqueInput
  }

  /**
   * ProjectCiToken findUniqueOrThrow
   */
  export type ProjectCiTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCiToken
     */
    select?: ProjectCiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectCiToken
     */
    omit?: ProjectCiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectCiTokenInclude<ExtArgs> | null
    /**
     * Filter, which ProjectCiToken to fetch.
     */
    where: ProjectCiTokenWhereUniqueInput
  }

  /**
   * ProjectCiToken findFirst
   */
  export type ProjectCiTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCiToken
     */
    select?: ProjectCiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectCiToken
     */
    omit?: ProjectCiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectCiTokenInclude<ExtArgs> | null
    /**
     * Filter, which ProjectCiToken to fetch.
     */
    where?: ProjectCiTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectCiTokens to fetch.
     */
    orderBy?: ProjectCiTokenOrderByWithRelationInput | ProjectCiTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectCiTokens.
     */
    cursor?: ProjectCiTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectCiTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectCiTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectCiTokens.
     */
    distinct?: ProjectCiTokenScalarFieldEnum | ProjectCiTokenScalarFieldEnum[]
  }

  /**
   * ProjectCiToken findFirstOrThrow
   */
  export type ProjectCiTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCiToken
     */
    select?: ProjectCiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectCiToken
     */
    omit?: ProjectCiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectCiTokenInclude<ExtArgs> | null
    /**
     * Filter, which ProjectCiToken to fetch.
     */
    where?: ProjectCiTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectCiTokens to fetch.
     */
    orderBy?: ProjectCiTokenOrderByWithRelationInput | ProjectCiTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectCiTokens.
     */
    cursor?: ProjectCiTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectCiTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectCiTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectCiTokens.
     */
    distinct?: ProjectCiTokenScalarFieldEnum | ProjectCiTokenScalarFieldEnum[]
  }

  /**
   * ProjectCiToken findMany
   */
  export type ProjectCiTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCiToken
     */
    select?: ProjectCiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectCiToken
     */
    omit?: ProjectCiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectCiTokenInclude<ExtArgs> | null
    /**
     * Filter, which ProjectCiTokens to fetch.
     */
    where?: ProjectCiTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectCiTokens to fetch.
     */
    orderBy?: ProjectCiTokenOrderByWithRelationInput | ProjectCiTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectCiTokens.
     */
    cursor?: ProjectCiTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectCiTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectCiTokens.
     */
    skip?: number
    distinct?: ProjectCiTokenScalarFieldEnum | ProjectCiTokenScalarFieldEnum[]
  }

  /**
   * ProjectCiToken create
   */
  export type ProjectCiTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCiToken
     */
    select?: ProjectCiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectCiToken
     */
    omit?: ProjectCiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectCiTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectCiToken.
     */
    data: XOR<ProjectCiTokenCreateInput, ProjectCiTokenUncheckedCreateInput>
  }

  /**
   * ProjectCiToken createMany
   */
  export type ProjectCiTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectCiTokens.
     */
    data: ProjectCiTokenCreateManyInput | ProjectCiTokenCreateManyInput[]
  }

  /**
   * ProjectCiToken update
   */
  export type ProjectCiTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCiToken
     */
    select?: ProjectCiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectCiToken
     */
    omit?: ProjectCiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectCiTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectCiToken.
     */
    data: XOR<ProjectCiTokenUpdateInput, ProjectCiTokenUncheckedUpdateInput>
    /**
     * Choose, which ProjectCiToken to update.
     */
    where: ProjectCiTokenWhereUniqueInput
  }

  /**
   * ProjectCiToken updateMany
   */
  export type ProjectCiTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectCiTokens.
     */
    data: XOR<ProjectCiTokenUpdateManyMutationInput, ProjectCiTokenUncheckedUpdateManyInput>
    /**
     * Filter which ProjectCiTokens to update
     */
    where?: ProjectCiTokenWhereInput
    /**
     * Limit how many ProjectCiTokens to update.
     */
    limit?: number
  }

  /**
   * ProjectCiToken upsert
   */
  export type ProjectCiTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCiToken
     */
    select?: ProjectCiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectCiToken
     */
    omit?: ProjectCiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectCiTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectCiToken to update in case it exists.
     */
    where: ProjectCiTokenWhereUniqueInput
    /**
     * In case the ProjectCiToken found by the `where` argument doesn't exist, create a new ProjectCiToken with this data.
     */
    create: XOR<ProjectCiTokenCreateInput, ProjectCiTokenUncheckedCreateInput>
    /**
     * In case the ProjectCiToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectCiTokenUpdateInput, ProjectCiTokenUncheckedUpdateInput>
  }

  /**
   * ProjectCiToken delete
   */
  export type ProjectCiTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCiToken
     */
    select?: ProjectCiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectCiToken
     */
    omit?: ProjectCiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectCiTokenInclude<ExtArgs> | null
    /**
     * Filter which ProjectCiToken to delete.
     */
    where: ProjectCiTokenWhereUniqueInput
  }

  /**
   * ProjectCiToken deleteMany
   */
  export type ProjectCiTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectCiTokens to delete
     */
    where?: ProjectCiTokenWhereInput
    /**
     * Limit how many ProjectCiTokens to delete.
     */
    limit?: number
  }

  /**
   * ProjectCiToken without action
   */
  export type ProjectCiTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCiToken
     */
    select?: ProjectCiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectCiToken
     */
    omit?: ProjectCiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectCiTokenInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable',
    Snapshot: 'Snapshot'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    description: 'description',
    model: 'model',
    systemPrompt: 'systemPrompt',
    temperature: 'temperature',
    topP: 'topP',
    maxTokens: 'maxTokens',
    inputCostPerMillion: 'inputCostPerMillion',
    cachedInputCostPerMillion: 'cachedInputCostPerMillion',
    outputCostPerMillion: 'outputCostPerMillion',
    allowedQualityDrop: 'allowedQualityDrop',
    cacheEnabled: 'cacheEnabled',
    cacheTtlSeconds: 'cacheTtlSeconds',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const DatasetScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    name: 'name',
    description: 'description',
    version: 'version',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DatasetScalarFieldEnum = (typeof DatasetScalarFieldEnum)[keyof typeof DatasetScalarFieldEnum]


  export const TestCaseScalarFieldEnum: {
    id: 'id',
    datasetId: 'datasetId',
    input: 'input',
    expectedOutput: 'expectedOutput',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TestCaseScalarFieldEnum = (typeof TestCaseScalarFieldEnum)[keyof typeof TestCaseScalarFieldEnum]


  export const EvaluatorScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    name: 'name',
    type: 'type',
    config: 'config',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EvaluatorScalarFieldEnum = (typeof EvaluatorScalarFieldEnum)[keyof typeof EvaluatorScalarFieldEnum]


  export const ExperimentScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    datasetId: 'datasetId',
    name: 'name',
    model: 'model',
    status: 'status',
    qualityScore: 'qualityScore',
    passRate: 'passRate',
    avgLatencyMs: 'avgLatencyMs',
    totalTokens: 'totalTokens',
    totalCostUsd: 'totalCostUsd',
    cacheHitRate: 'cacheHitRate',
    cacheMissRate: 'cacheMissRate',
    llmCallsAvoided: 'llmCallsAvoided',
    cachedInputTokens: 'cachedInputTokens',
    estimatedCostSavedUsd: 'estimatedCostSavedUsd',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    allowedQualityDrop: 'allowedQualityDrop',
    errorMessage: 'errorMessage',
    failOnRegression: 'failOnRegression',
    regressionDelta: 'regressionDelta',
    regressionPassed: 'regressionPassed',
    useCache: 'useCache'
  };

  export type ExperimentScalarFieldEnum = (typeof ExperimentScalarFieldEnum)[keyof typeof ExperimentScalarFieldEnum]


  export const EvaluationResultScalarFieldEnum: {
    id: 'id',
    experimentId: 'experimentId',
    testCaseId: 'testCaseId',
    actualOutput: 'actualOutput',
    score: 'score',
    passed: 'passed',
    latencyMs: 'latencyMs',
    ttftMs: 'ttftMs',
    inputTokens: 'inputTokens',
    outputTokens: 'outputTokens',
    cacheHit: 'cacheHit',
    reason: 'reason',
    createdAt: 'createdAt',
    cachedInputTokens: 'cachedInputTokens',
    estimatedCostUsd: 'estimatedCostUsd',
    totalTokens: 'totalTokens',
    uncachedEstimatedCostUsd: 'uncachedEstimatedCostUsd'
  };

  export type EvaluationResultScalarFieldEnum = (typeof EvaluationResultScalarFieldEnum)[keyof typeof EvaluationResultScalarFieldEnum]


  export const GithubIntegrationScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    repositoryName: 'repositoryName',
    repositoryId: 'repositoryId',
    installationId: 'installationId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GithubIntegrationScalarFieldEnum = (typeof GithubIntegrationScalarFieldEnum)[keyof typeof GithubIntegrationScalarFieldEnum]


  export const BaselineScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    experimentId: 'experimentId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BaselineScalarFieldEnum = (typeof BaselineScalarFieldEnum)[keyof typeof BaselineScalarFieldEnum]


  export const ProjectCiTokenScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    tokenHash: 'tokenHash',
    tokenPrefix: 'tokenPrefix',
    createdAt: 'createdAt',
    revokedAt: 'revokedAt'
  };

  export type ProjectCiTokenScalarFieldEnum = (typeof ProjectCiTokenScalarFieldEnum)[keyof typeof ProjectCiTokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    projects?: ProjectListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projects?: ProjectOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    projects?: ProjectListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    userId?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    model?: StringFilter<"Project"> | string
    systemPrompt?: StringNullableFilter<"Project"> | string | null
    temperature?: FloatNullableFilter<"Project"> | number | null
    topP?: FloatNullableFilter<"Project"> | number | null
    maxTokens?: IntNullableFilter<"Project"> | number | null
    inputCostPerMillion?: FloatFilter<"Project"> | number
    cachedInputCostPerMillion?: FloatFilter<"Project"> | number
    outputCostPerMillion?: FloatFilter<"Project"> | number
    allowedQualityDrop?: FloatFilter<"Project"> | number
    cacheEnabled?: BoolFilter<"Project"> | boolean
    cacheTtlSeconds?: IntFilter<"Project"> | number
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    baseline?: XOR<BaselineNullableScalarRelationFilter, BaselineWhereInput> | null
    datasets?: DatasetListRelationFilter
    evaluators?: EvaluatorListRelationFilter
    experiments?: ExperimentListRelationFilter
    githubIntegrations?: GithubIntegrationListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    ciToken?: XOR<ProjectCiTokenNullableScalarRelationFilter, ProjectCiTokenWhereInput> | null
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    model?: SortOrder
    systemPrompt?: SortOrderInput | SortOrder
    temperature?: SortOrderInput | SortOrder
    topP?: SortOrderInput | SortOrder
    maxTokens?: SortOrderInput | SortOrder
    inputCostPerMillion?: SortOrder
    cachedInputCostPerMillion?: SortOrder
    outputCostPerMillion?: SortOrder
    allowedQualityDrop?: SortOrder
    cacheEnabled?: SortOrder
    cacheTtlSeconds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    baseline?: BaselineOrderByWithRelationInput
    datasets?: DatasetOrderByRelationAggregateInput
    evaluators?: EvaluatorOrderByRelationAggregateInput
    experiments?: ExperimentOrderByRelationAggregateInput
    githubIntegrations?: GithubIntegrationOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
    ciToken?: ProjectCiTokenOrderByWithRelationInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    userId?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    model?: StringFilter<"Project"> | string
    systemPrompt?: StringNullableFilter<"Project"> | string | null
    temperature?: FloatNullableFilter<"Project"> | number | null
    topP?: FloatNullableFilter<"Project"> | number | null
    maxTokens?: IntNullableFilter<"Project"> | number | null
    inputCostPerMillion?: FloatFilter<"Project"> | number
    cachedInputCostPerMillion?: FloatFilter<"Project"> | number
    outputCostPerMillion?: FloatFilter<"Project"> | number
    allowedQualityDrop?: FloatFilter<"Project"> | number
    cacheEnabled?: BoolFilter<"Project"> | boolean
    cacheTtlSeconds?: IntFilter<"Project"> | number
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    baseline?: XOR<BaselineNullableScalarRelationFilter, BaselineWhereInput> | null
    datasets?: DatasetListRelationFilter
    evaluators?: EvaluatorListRelationFilter
    experiments?: ExperimentListRelationFilter
    githubIntegrations?: GithubIntegrationListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    ciToken?: XOR<ProjectCiTokenNullableScalarRelationFilter, ProjectCiTokenWhereInput> | null
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    model?: SortOrder
    systemPrompt?: SortOrderInput | SortOrder
    temperature?: SortOrderInput | SortOrder
    topP?: SortOrderInput | SortOrder
    maxTokens?: SortOrderInput | SortOrder
    inputCostPerMillion?: SortOrder
    cachedInputCostPerMillion?: SortOrder
    outputCostPerMillion?: SortOrder
    allowedQualityDrop?: SortOrder
    cacheEnabled?: SortOrder
    cacheTtlSeconds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    userId?: StringWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    model?: StringWithAggregatesFilter<"Project"> | string
    systemPrompt?: StringNullableWithAggregatesFilter<"Project"> | string | null
    temperature?: FloatNullableWithAggregatesFilter<"Project"> | number | null
    topP?: FloatNullableWithAggregatesFilter<"Project"> | number | null
    maxTokens?: IntNullableWithAggregatesFilter<"Project"> | number | null
    inputCostPerMillion?: FloatWithAggregatesFilter<"Project"> | number
    cachedInputCostPerMillion?: FloatWithAggregatesFilter<"Project"> | number
    outputCostPerMillion?: FloatWithAggregatesFilter<"Project"> | number
    allowedQualityDrop?: FloatWithAggregatesFilter<"Project"> | number
    cacheEnabled?: BoolWithAggregatesFilter<"Project"> | boolean
    cacheTtlSeconds?: IntWithAggregatesFilter<"Project"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type DatasetWhereInput = {
    AND?: DatasetWhereInput | DatasetWhereInput[]
    OR?: DatasetWhereInput[]
    NOT?: DatasetWhereInput | DatasetWhereInput[]
    id?: StringFilter<"Dataset"> | string
    projectId?: StringFilter<"Dataset"> | string
    name?: StringFilter<"Dataset"> | string
    description?: StringNullableFilter<"Dataset"> | string | null
    version?: IntFilter<"Dataset"> | number
    createdAt?: DateTimeFilter<"Dataset"> | Date | string
    updatedAt?: DateTimeFilter<"Dataset"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    experiments?: ExperimentListRelationFilter
    testCases?: TestCaseListRelationFilter
  }

  export type DatasetOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    experiments?: ExperimentOrderByRelationAggregateInput
    testCases?: TestCaseOrderByRelationAggregateInput
  }

  export type DatasetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DatasetWhereInput | DatasetWhereInput[]
    OR?: DatasetWhereInput[]
    NOT?: DatasetWhereInput | DatasetWhereInput[]
    projectId?: StringFilter<"Dataset"> | string
    name?: StringFilter<"Dataset"> | string
    description?: StringNullableFilter<"Dataset"> | string | null
    version?: IntFilter<"Dataset"> | number
    createdAt?: DateTimeFilter<"Dataset"> | Date | string
    updatedAt?: DateTimeFilter<"Dataset"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    experiments?: ExperimentListRelationFilter
    testCases?: TestCaseListRelationFilter
  }, "id">

  export type DatasetOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DatasetCountOrderByAggregateInput
    _avg?: DatasetAvgOrderByAggregateInput
    _max?: DatasetMaxOrderByAggregateInput
    _min?: DatasetMinOrderByAggregateInput
    _sum?: DatasetSumOrderByAggregateInput
  }

  export type DatasetScalarWhereWithAggregatesInput = {
    AND?: DatasetScalarWhereWithAggregatesInput | DatasetScalarWhereWithAggregatesInput[]
    OR?: DatasetScalarWhereWithAggregatesInput[]
    NOT?: DatasetScalarWhereWithAggregatesInput | DatasetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Dataset"> | string
    projectId?: StringWithAggregatesFilter<"Dataset"> | string
    name?: StringWithAggregatesFilter<"Dataset"> | string
    description?: StringNullableWithAggregatesFilter<"Dataset"> | string | null
    version?: IntWithAggregatesFilter<"Dataset"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Dataset"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Dataset"> | Date | string
  }

  export type TestCaseWhereInput = {
    AND?: TestCaseWhereInput | TestCaseWhereInput[]
    OR?: TestCaseWhereInput[]
    NOT?: TestCaseWhereInput | TestCaseWhereInput[]
    id?: StringFilter<"TestCase"> | string
    datasetId?: StringFilter<"TestCase"> | string
    input?: StringFilter<"TestCase"> | string
    expectedOutput?: StringNullableFilter<"TestCase"> | string | null
    metadata?: StringNullableFilter<"TestCase"> | string | null
    createdAt?: DateTimeFilter<"TestCase"> | Date | string
    updatedAt?: DateTimeFilter<"TestCase"> | Date | string
    results?: EvaluationResultListRelationFilter
    dataset?: XOR<DatasetScalarRelationFilter, DatasetWhereInput>
  }

  export type TestCaseOrderByWithRelationInput = {
    id?: SortOrder
    datasetId?: SortOrder
    input?: SortOrder
    expectedOutput?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    results?: EvaluationResultOrderByRelationAggregateInput
    dataset?: DatasetOrderByWithRelationInput
  }

  export type TestCaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TestCaseWhereInput | TestCaseWhereInput[]
    OR?: TestCaseWhereInput[]
    NOT?: TestCaseWhereInput | TestCaseWhereInput[]
    datasetId?: StringFilter<"TestCase"> | string
    input?: StringFilter<"TestCase"> | string
    expectedOutput?: StringNullableFilter<"TestCase"> | string | null
    metadata?: StringNullableFilter<"TestCase"> | string | null
    createdAt?: DateTimeFilter<"TestCase"> | Date | string
    updatedAt?: DateTimeFilter<"TestCase"> | Date | string
    results?: EvaluationResultListRelationFilter
    dataset?: XOR<DatasetScalarRelationFilter, DatasetWhereInput>
  }, "id">

  export type TestCaseOrderByWithAggregationInput = {
    id?: SortOrder
    datasetId?: SortOrder
    input?: SortOrder
    expectedOutput?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TestCaseCountOrderByAggregateInput
    _max?: TestCaseMaxOrderByAggregateInput
    _min?: TestCaseMinOrderByAggregateInput
  }

  export type TestCaseScalarWhereWithAggregatesInput = {
    AND?: TestCaseScalarWhereWithAggregatesInput | TestCaseScalarWhereWithAggregatesInput[]
    OR?: TestCaseScalarWhereWithAggregatesInput[]
    NOT?: TestCaseScalarWhereWithAggregatesInput | TestCaseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TestCase"> | string
    datasetId?: StringWithAggregatesFilter<"TestCase"> | string
    input?: StringWithAggregatesFilter<"TestCase"> | string
    expectedOutput?: StringNullableWithAggregatesFilter<"TestCase"> | string | null
    metadata?: StringNullableWithAggregatesFilter<"TestCase"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TestCase"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TestCase"> | Date | string
  }

  export type EvaluatorWhereInput = {
    AND?: EvaluatorWhereInput | EvaluatorWhereInput[]
    OR?: EvaluatorWhereInput[]
    NOT?: EvaluatorWhereInput | EvaluatorWhereInput[]
    id?: StringFilter<"Evaluator"> | string
    projectId?: StringFilter<"Evaluator"> | string
    name?: StringFilter<"Evaluator"> | string
    type?: StringFilter<"Evaluator"> | string
    config?: StringFilter<"Evaluator"> | string
    createdAt?: DateTimeFilter<"Evaluator"> | Date | string
    updatedAt?: DateTimeFilter<"Evaluator"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type EvaluatorOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    config?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type EvaluatorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EvaluatorWhereInput | EvaluatorWhereInput[]
    OR?: EvaluatorWhereInput[]
    NOT?: EvaluatorWhereInput | EvaluatorWhereInput[]
    projectId?: StringFilter<"Evaluator"> | string
    name?: StringFilter<"Evaluator"> | string
    type?: StringFilter<"Evaluator"> | string
    config?: StringFilter<"Evaluator"> | string
    createdAt?: DateTimeFilter<"Evaluator"> | Date | string
    updatedAt?: DateTimeFilter<"Evaluator"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type EvaluatorOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    config?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EvaluatorCountOrderByAggregateInput
    _max?: EvaluatorMaxOrderByAggregateInput
    _min?: EvaluatorMinOrderByAggregateInput
  }

  export type EvaluatorScalarWhereWithAggregatesInput = {
    AND?: EvaluatorScalarWhereWithAggregatesInput | EvaluatorScalarWhereWithAggregatesInput[]
    OR?: EvaluatorScalarWhereWithAggregatesInput[]
    NOT?: EvaluatorScalarWhereWithAggregatesInput | EvaluatorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Evaluator"> | string
    projectId?: StringWithAggregatesFilter<"Evaluator"> | string
    name?: StringWithAggregatesFilter<"Evaluator"> | string
    type?: StringWithAggregatesFilter<"Evaluator"> | string
    config?: StringWithAggregatesFilter<"Evaluator"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Evaluator"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Evaluator"> | Date | string
  }

  export type ExperimentWhereInput = {
    AND?: ExperimentWhereInput | ExperimentWhereInput[]
    OR?: ExperimentWhereInput[]
    NOT?: ExperimentWhereInput | ExperimentWhereInput[]
    id?: StringFilter<"Experiment"> | string
    projectId?: StringFilter<"Experiment"> | string
    datasetId?: StringFilter<"Experiment"> | string
    name?: StringFilter<"Experiment"> | string
    model?: StringFilter<"Experiment"> | string
    status?: StringFilter<"Experiment"> | string
    qualityScore?: FloatNullableFilter<"Experiment"> | number | null
    passRate?: FloatNullableFilter<"Experiment"> | number | null
    avgLatencyMs?: FloatNullableFilter<"Experiment"> | number | null
    totalTokens?: IntFilter<"Experiment"> | number
    totalCostUsd?: FloatFilter<"Experiment"> | number
    cacheHitRate?: FloatFilter<"Experiment"> | number
    cacheMissRate?: FloatFilter<"Experiment"> | number
    llmCallsAvoided?: IntFilter<"Experiment"> | number
    cachedInputTokens?: IntFilter<"Experiment"> | number
    estimatedCostSavedUsd?: FloatFilter<"Experiment"> | number
    createdAt?: DateTimeFilter<"Experiment"> | Date | string
    updatedAt?: DateTimeFilter<"Experiment"> | Date | string
    allowedQualityDrop?: FloatFilter<"Experiment"> | number
    errorMessage?: StringNullableFilter<"Experiment"> | string | null
    failOnRegression?: BoolFilter<"Experiment"> | boolean
    regressionDelta?: FloatNullableFilter<"Experiment"> | number | null
    regressionPassed?: BoolFilter<"Experiment"> | boolean
    useCache?: BoolFilter<"Experiment"> | boolean
    results?: EvaluationResultListRelationFilter
    dataset?: XOR<DatasetScalarRelationFilter, DatasetWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ExperimentOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    datasetId?: SortOrder
    name?: SortOrder
    model?: SortOrder
    status?: SortOrder
    qualityScore?: SortOrderInput | SortOrder
    passRate?: SortOrderInput | SortOrder
    avgLatencyMs?: SortOrderInput | SortOrder
    totalTokens?: SortOrder
    totalCostUsd?: SortOrder
    cacheHitRate?: SortOrder
    cacheMissRate?: SortOrder
    llmCallsAvoided?: SortOrder
    cachedInputTokens?: SortOrder
    estimatedCostSavedUsd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    allowedQualityDrop?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    failOnRegression?: SortOrder
    regressionDelta?: SortOrderInput | SortOrder
    regressionPassed?: SortOrder
    useCache?: SortOrder
    results?: EvaluationResultOrderByRelationAggregateInput
    dataset?: DatasetOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
  }

  export type ExperimentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExperimentWhereInput | ExperimentWhereInput[]
    OR?: ExperimentWhereInput[]
    NOT?: ExperimentWhereInput | ExperimentWhereInput[]
    projectId?: StringFilter<"Experiment"> | string
    datasetId?: StringFilter<"Experiment"> | string
    name?: StringFilter<"Experiment"> | string
    model?: StringFilter<"Experiment"> | string
    status?: StringFilter<"Experiment"> | string
    qualityScore?: FloatNullableFilter<"Experiment"> | number | null
    passRate?: FloatNullableFilter<"Experiment"> | number | null
    avgLatencyMs?: FloatNullableFilter<"Experiment"> | number | null
    totalTokens?: IntFilter<"Experiment"> | number
    totalCostUsd?: FloatFilter<"Experiment"> | number
    cacheHitRate?: FloatFilter<"Experiment"> | number
    cacheMissRate?: FloatFilter<"Experiment"> | number
    llmCallsAvoided?: IntFilter<"Experiment"> | number
    cachedInputTokens?: IntFilter<"Experiment"> | number
    estimatedCostSavedUsd?: FloatFilter<"Experiment"> | number
    createdAt?: DateTimeFilter<"Experiment"> | Date | string
    updatedAt?: DateTimeFilter<"Experiment"> | Date | string
    allowedQualityDrop?: FloatFilter<"Experiment"> | number
    errorMessage?: StringNullableFilter<"Experiment"> | string | null
    failOnRegression?: BoolFilter<"Experiment"> | boolean
    regressionDelta?: FloatNullableFilter<"Experiment"> | number | null
    regressionPassed?: BoolFilter<"Experiment"> | boolean
    useCache?: BoolFilter<"Experiment"> | boolean
    results?: EvaluationResultListRelationFilter
    dataset?: XOR<DatasetScalarRelationFilter, DatasetWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type ExperimentOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    datasetId?: SortOrder
    name?: SortOrder
    model?: SortOrder
    status?: SortOrder
    qualityScore?: SortOrderInput | SortOrder
    passRate?: SortOrderInput | SortOrder
    avgLatencyMs?: SortOrderInput | SortOrder
    totalTokens?: SortOrder
    totalCostUsd?: SortOrder
    cacheHitRate?: SortOrder
    cacheMissRate?: SortOrder
    llmCallsAvoided?: SortOrder
    cachedInputTokens?: SortOrder
    estimatedCostSavedUsd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    allowedQualityDrop?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    failOnRegression?: SortOrder
    regressionDelta?: SortOrderInput | SortOrder
    regressionPassed?: SortOrder
    useCache?: SortOrder
    _count?: ExperimentCountOrderByAggregateInput
    _avg?: ExperimentAvgOrderByAggregateInput
    _max?: ExperimentMaxOrderByAggregateInput
    _min?: ExperimentMinOrderByAggregateInput
    _sum?: ExperimentSumOrderByAggregateInput
  }

  export type ExperimentScalarWhereWithAggregatesInput = {
    AND?: ExperimentScalarWhereWithAggregatesInput | ExperimentScalarWhereWithAggregatesInput[]
    OR?: ExperimentScalarWhereWithAggregatesInput[]
    NOT?: ExperimentScalarWhereWithAggregatesInput | ExperimentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Experiment"> | string
    projectId?: StringWithAggregatesFilter<"Experiment"> | string
    datasetId?: StringWithAggregatesFilter<"Experiment"> | string
    name?: StringWithAggregatesFilter<"Experiment"> | string
    model?: StringWithAggregatesFilter<"Experiment"> | string
    status?: StringWithAggregatesFilter<"Experiment"> | string
    qualityScore?: FloatNullableWithAggregatesFilter<"Experiment"> | number | null
    passRate?: FloatNullableWithAggregatesFilter<"Experiment"> | number | null
    avgLatencyMs?: FloatNullableWithAggregatesFilter<"Experiment"> | number | null
    totalTokens?: IntWithAggregatesFilter<"Experiment"> | number
    totalCostUsd?: FloatWithAggregatesFilter<"Experiment"> | number
    cacheHitRate?: FloatWithAggregatesFilter<"Experiment"> | number
    cacheMissRate?: FloatWithAggregatesFilter<"Experiment"> | number
    llmCallsAvoided?: IntWithAggregatesFilter<"Experiment"> | number
    cachedInputTokens?: IntWithAggregatesFilter<"Experiment"> | number
    estimatedCostSavedUsd?: FloatWithAggregatesFilter<"Experiment"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Experiment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Experiment"> | Date | string
    allowedQualityDrop?: FloatWithAggregatesFilter<"Experiment"> | number
    errorMessage?: StringNullableWithAggregatesFilter<"Experiment"> | string | null
    failOnRegression?: BoolWithAggregatesFilter<"Experiment"> | boolean
    regressionDelta?: FloatNullableWithAggregatesFilter<"Experiment"> | number | null
    regressionPassed?: BoolWithAggregatesFilter<"Experiment"> | boolean
    useCache?: BoolWithAggregatesFilter<"Experiment"> | boolean
  }

  export type EvaluationResultWhereInput = {
    AND?: EvaluationResultWhereInput | EvaluationResultWhereInput[]
    OR?: EvaluationResultWhereInput[]
    NOT?: EvaluationResultWhereInput | EvaluationResultWhereInput[]
    id?: StringFilter<"EvaluationResult"> | string
    experimentId?: StringFilter<"EvaluationResult"> | string
    testCaseId?: StringFilter<"EvaluationResult"> | string
    actualOutput?: StringFilter<"EvaluationResult"> | string
    score?: FloatFilter<"EvaluationResult"> | number
    passed?: BoolFilter<"EvaluationResult"> | boolean
    latencyMs?: IntNullableFilter<"EvaluationResult"> | number | null
    ttftMs?: IntNullableFilter<"EvaluationResult"> | number | null
    inputTokens?: IntNullableFilter<"EvaluationResult"> | number | null
    outputTokens?: IntNullableFilter<"EvaluationResult"> | number | null
    cacheHit?: BoolFilter<"EvaluationResult"> | boolean
    reason?: StringNullableFilter<"EvaluationResult"> | string | null
    createdAt?: DateTimeFilter<"EvaluationResult"> | Date | string
    cachedInputTokens?: IntFilter<"EvaluationResult"> | number
    estimatedCostUsd?: FloatNullableFilter<"EvaluationResult"> | number | null
    totalTokens?: IntNullableFilter<"EvaluationResult"> | number | null
    uncachedEstimatedCostUsd?: FloatNullableFilter<"EvaluationResult"> | number | null
    experiment?: XOR<ExperimentScalarRelationFilter, ExperimentWhereInput>
    testCase?: XOR<TestCaseScalarRelationFilter, TestCaseWhereInput>
  }

  export type EvaluationResultOrderByWithRelationInput = {
    id?: SortOrder
    experimentId?: SortOrder
    testCaseId?: SortOrder
    actualOutput?: SortOrder
    score?: SortOrder
    passed?: SortOrder
    latencyMs?: SortOrderInput | SortOrder
    ttftMs?: SortOrderInput | SortOrder
    inputTokens?: SortOrderInput | SortOrder
    outputTokens?: SortOrderInput | SortOrder
    cacheHit?: SortOrder
    reason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    cachedInputTokens?: SortOrder
    estimatedCostUsd?: SortOrderInput | SortOrder
    totalTokens?: SortOrderInput | SortOrder
    uncachedEstimatedCostUsd?: SortOrderInput | SortOrder
    experiment?: ExperimentOrderByWithRelationInput
    testCase?: TestCaseOrderByWithRelationInput
  }

  export type EvaluationResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EvaluationResultWhereInput | EvaluationResultWhereInput[]
    OR?: EvaluationResultWhereInput[]
    NOT?: EvaluationResultWhereInput | EvaluationResultWhereInput[]
    experimentId?: StringFilter<"EvaluationResult"> | string
    testCaseId?: StringFilter<"EvaluationResult"> | string
    actualOutput?: StringFilter<"EvaluationResult"> | string
    score?: FloatFilter<"EvaluationResult"> | number
    passed?: BoolFilter<"EvaluationResult"> | boolean
    latencyMs?: IntNullableFilter<"EvaluationResult"> | number | null
    ttftMs?: IntNullableFilter<"EvaluationResult"> | number | null
    inputTokens?: IntNullableFilter<"EvaluationResult"> | number | null
    outputTokens?: IntNullableFilter<"EvaluationResult"> | number | null
    cacheHit?: BoolFilter<"EvaluationResult"> | boolean
    reason?: StringNullableFilter<"EvaluationResult"> | string | null
    createdAt?: DateTimeFilter<"EvaluationResult"> | Date | string
    cachedInputTokens?: IntFilter<"EvaluationResult"> | number
    estimatedCostUsd?: FloatNullableFilter<"EvaluationResult"> | number | null
    totalTokens?: IntNullableFilter<"EvaluationResult"> | number | null
    uncachedEstimatedCostUsd?: FloatNullableFilter<"EvaluationResult"> | number | null
    experiment?: XOR<ExperimentScalarRelationFilter, ExperimentWhereInput>
    testCase?: XOR<TestCaseScalarRelationFilter, TestCaseWhereInput>
  }, "id">

  export type EvaluationResultOrderByWithAggregationInput = {
    id?: SortOrder
    experimentId?: SortOrder
    testCaseId?: SortOrder
    actualOutput?: SortOrder
    score?: SortOrder
    passed?: SortOrder
    latencyMs?: SortOrderInput | SortOrder
    ttftMs?: SortOrderInput | SortOrder
    inputTokens?: SortOrderInput | SortOrder
    outputTokens?: SortOrderInput | SortOrder
    cacheHit?: SortOrder
    reason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    cachedInputTokens?: SortOrder
    estimatedCostUsd?: SortOrderInput | SortOrder
    totalTokens?: SortOrderInput | SortOrder
    uncachedEstimatedCostUsd?: SortOrderInput | SortOrder
    _count?: EvaluationResultCountOrderByAggregateInput
    _avg?: EvaluationResultAvgOrderByAggregateInput
    _max?: EvaluationResultMaxOrderByAggregateInput
    _min?: EvaluationResultMinOrderByAggregateInput
    _sum?: EvaluationResultSumOrderByAggregateInput
  }

  export type EvaluationResultScalarWhereWithAggregatesInput = {
    AND?: EvaluationResultScalarWhereWithAggregatesInput | EvaluationResultScalarWhereWithAggregatesInput[]
    OR?: EvaluationResultScalarWhereWithAggregatesInput[]
    NOT?: EvaluationResultScalarWhereWithAggregatesInput | EvaluationResultScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EvaluationResult"> | string
    experimentId?: StringWithAggregatesFilter<"EvaluationResult"> | string
    testCaseId?: StringWithAggregatesFilter<"EvaluationResult"> | string
    actualOutput?: StringWithAggregatesFilter<"EvaluationResult"> | string
    score?: FloatWithAggregatesFilter<"EvaluationResult"> | number
    passed?: BoolWithAggregatesFilter<"EvaluationResult"> | boolean
    latencyMs?: IntNullableWithAggregatesFilter<"EvaluationResult"> | number | null
    ttftMs?: IntNullableWithAggregatesFilter<"EvaluationResult"> | number | null
    inputTokens?: IntNullableWithAggregatesFilter<"EvaluationResult"> | number | null
    outputTokens?: IntNullableWithAggregatesFilter<"EvaluationResult"> | number | null
    cacheHit?: BoolWithAggregatesFilter<"EvaluationResult"> | boolean
    reason?: StringNullableWithAggregatesFilter<"EvaluationResult"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"EvaluationResult"> | Date | string
    cachedInputTokens?: IntWithAggregatesFilter<"EvaluationResult"> | number
    estimatedCostUsd?: FloatNullableWithAggregatesFilter<"EvaluationResult"> | number | null
    totalTokens?: IntNullableWithAggregatesFilter<"EvaluationResult"> | number | null
    uncachedEstimatedCostUsd?: FloatNullableWithAggregatesFilter<"EvaluationResult"> | number | null
  }

  export type GithubIntegrationWhereInput = {
    AND?: GithubIntegrationWhereInput | GithubIntegrationWhereInput[]
    OR?: GithubIntegrationWhereInput[]
    NOT?: GithubIntegrationWhereInput | GithubIntegrationWhereInput[]
    id?: StringFilter<"GithubIntegration"> | string
    projectId?: StringFilter<"GithubIntegration"> | string
    repositoryName?: StringFilter<"GithubIntegration"> | string
    repositoryId?: StringNullableFilter<"GithubIntegration"> | string | null
    installationId?: StringNullableFilter<"GithubIntegration"> | string | null
    createdAt?: DateTimeFilter<"GithubIntegration"> | Date | string
    updatedAt?: DateTimeFilter<"GithubIntegration"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type GithubIntegrationOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    repositoryName?: SortOrder
    repositoryId?: SortOrderInput | SortOrder
    installationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type GithubIntegrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GithubIntegrationWhereInput | GithubIntegrationWhereInput[]
    OR?: GithubIntegrationWhereInput[]
    NOT?: GithubIntegrationWhereInput | GithubIntegrationWhereInput[]
    projectId?: StringFilter<"GithubIntegration"> | string
    repositoryName?: StringFilter<"GithubIntegration"> | string
    repositoryId?: StringNullableFilter<"GithubIntegration"> | string | null
    installationId?: StringNullableFilter<"GithubIntegration"> | string | null
    createdAt?: DateTimeFilter<"GithubIntegration"> | Date | string
    updatedAt?: DateTimeFilter<"GithubIntegration"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type GithubIntegrationOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    repositoryName?: SortOrder
    repositoryId?: SortOrderInput | SortOrder
    installationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GithubIntegrationCountOrderByAggregateInput
    _max?: GithubIntegrationMaxOrderByAggregateInput
    _min?: GithubIntegrationMinOrderByAggregateInput
  }

  export type GithubIntegrationScalarWhereWithAggregatesInput = {
    AND?: GithubIntegrationScalarWhereWithAggregatesInput | GithubIntegrationScalarWhereWithAggregatesInput[]
    OR?: GithubIntegrationScalarWhereWithAggregatesInput[]
    NOT?: GithubIntegrationScalarWhereWithAggregatesInput | GithubIntegrationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GithubIntegration"> | string
    projectId?: StringWithAggregatesFilter<"GithubIntegration"> | string
    repositoryName?: StringWithAggregatesFilter<"GithubIntegration"> | string
    repositoryId?: StringNullableWithAggregatesFilter<"GithubIntegration"> | string | null
    installationId?: StringNullableWithAggregatesFilter<"GithubIntegration"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"GithubIntegration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GithubIntegration"> | Date | string
  }

  export type BaselineWhereInput = {
    AND?: BaselineWhereInput | BaselineWhereInput[]
    OR?: BaselineWhereInput[]
    NOT?: BaselineWhereInput | BaselineWhereInput[]
    id?: StringFilter<"Baseline"> | string
    projectId?: StringFilter<"Baseline"> | string
    experimentId?: StringFilter<"Baseline"> | string
    createdAt?: DateTimeFilter<"Baseline"> | Date | string
    updatedAt?: DateTimeFilter<"Baseline"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type BaselineOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    experimentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type BaselineWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    projectId?: string
    AND?: BaselineWhereInput | BaselineWhereInput[]
    OR?: BaselineWhereInput[]
    NOT?: BaselineWhereInput | BaselineWhereInput[]
    experimentId?: StringFilter<"Baseline"> | string
    createdAt?: DateTimeFilter<"Baseline"> | Date | string
    updatedAt?: DateTimeFilter<"Baseline"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id" | "projectId">

  export type BaselineOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    experimentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BaselineCountOrderByAggregateInput
    _max?: BaselineMaxOrderByAggregateInput
    _min?: BaselineMinOrderByAggregateInput
  }

  export type BaselineScalarWhereWithAggregatesInput = {
    AND?: BaselineScalarWhereWithAggregatesInput | BaselineScalarWhereWithAggregatesInput[]
    OR?: BaselineScalarWhereWithAggregatesInput[]
    NOT?: BaselineScalarWhereWithAggregatesInput | BaselineScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Baseline"> | string
    projectId?: StringWithAggregatesFilter<"Baseline"> | string
    experimentId?: StringWithAggregatesFilter<"Baseline"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Baseline"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Baseline"> | Date | string
  }

  export type ProjectCiTokenWhereInput = {
    AND?: ProjectCiTokenWhereInput | ProjectCiTokenWhereInput[]
    OR?: ProjectCiTokenWhereInput[]
    NOT?: ProjectCiTokenWhereInput | ProjectCiTokenWhereInput[]
    id?: StringFilter<"ProjectCiToken"> | string
    projectId?: StringFilter<"ProjectCiToken"> | string
    tokenHash?: StringFilter<"ProjectCiToken"> | string
    tokenPrefix?: StringFilter<"ProjectCiToken"> | string
    createdAt?: DateTimeFilter<"ProjectCiToken"> | Date | string
    revokedAt?: DateTimeNullableFilter<"ProjectCiToken"> | Date | string | null
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ProjectCiTokenOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    tokenHash?: SortOrder
    tokenPrefix?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ProjectCiTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    projectId?: string
    tokenHash?: string
    AND?: ProjectCiTokenWhereInput | ProjectCiTokenWhereInput[]
    OR?: ProjectCiTokenWhereInput[]
    NOT?: ProjectCiTokenWhereInput | ProjectCiTokenWhereInput[]
    tokenPrefix?: StringFilter<"ProjectCiToken"> | string
    createdAt?: DateTimeFilter<"ProjectCiToken"> | Date | string
    revokedAt?: DateTimeNullableFilter<"ProjectCiToken"> | Date | string | null
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id" | "projectId" | "tokenHash">

  export type ProjectCiTokenOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    tokenHash?: SortOrder
    tokenPrefix?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    _count?: ProjectCiTokenCountOrderByAggregateInput
    _max?: ProjectCiTokenMaxOrderByAggregateInput
    _min?: ProjectCiTokenMinOrderByAggregateInput
  }

  export type ProjectCiTokenScalarWhereWithAggregatesInput = {
    AND?: ProjectCiTokenScalarWhereWithAggregatesInput | ProjectCiTokenScalarWhereWithAggregatesInput[]
    OR?: ProjectCiTokenScalarWhereWithAggregatesInput[]
    NOT?: ProjectCiTokenScalarWhereWithAggregatesInput | ProjectCiTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectCiToken"> | string
    projectId?: StringWithAggregatesFilter<"ProjectCiToken"> | string
    tokenHash?: StringWithAggregatesFilter<"ProjectCiToken"> | string
    tokenPrefix?: StringWithAggregatesFilter<"ProjectCiToken"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ProjectCiToken"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"ProjectCiToken"> | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    name: string
    description?: string | null
    model: string
    systemPrompt?: string | null
    temperature?: number | null
    topP?: number | null
    maxTokens?: number | null
    inputCostPerMillion?: number
    cachedInputCostPerMillion?: number
    outputCostPerMillion?: number
    allowedQualityDrop?: number
    cacheEnabled?: boolean
    cacheTtlSeconds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    baseline?: BaselineCreateNestedOneWithoutProjectInput
    datasets?: DatasetCreateNestedManyWithoutProjectInput
    evaluators?: EvaluatorCreateNestedManyWithoutProjectInput
    experiments?: ExperimentCreateNestedManyWithoutProjectInput
    githubIntegrations?: GithubIntegrationCreateNestedManyWithoutProjectInput
    user: UserCreateNestedOneWithoutProjectsInput
    ciToken?: ProjectCiTokenCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    model: string
    systemPrompt?: string | null
    temperature?: number | null
    topP?: number | null
    maxTokens?: number | null
    inputCostPerMillion?: number
    cachedInputCostPerMillion?: number
    outputCostPerMillion?: number
    allowedQualityDrop?: number
    cacheEnabled?: boolean
    cacheTtlSeconds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    baseline?: BaselineUncheckedCreateNestedOneWithoutProjectInput
    datasets?: DatasetUncheckedCreateNestedManyWithoutProjectInput
    evaluators?: EvaluatorUncheckedCreateNestedManyWithoutProjectInput
    experiments?: ExperimentUncheckedCreateNestedManyWithoutProjectInput
    githubIntegrations?: GithubIntegrationUncheckedCreateNestedManyWithoutProjectInput
    ciToken?: ProjectCiTokenUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    topP?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    inputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    cachedInputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    outputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    cacheEnabled?: BoolFieldUpdateOperationsInput | boolean
    cacheTtlSeconds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baseline?: BaselineUpdateOneWithoutProjectNestedInput
    datasets?: DatasetUpdateManyWithoutProjectNestedInput
    evaluators?: EvaluatorUpdateManyWithoutProjectNestedInput
    experiments?: ExperimentUpdateManyWithoutProjectNestedInput
    githubIntegrations?: GithubIntegrationUpdateManyWithoutProjectNestedInput
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    ciToken?: ProjectCiTokenUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    topP?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    inputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    cachedInputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    outputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    cacheEnabled?: BoolFieldUpdateOperationsInput | boolean
    cacheTtlSeconds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baseline?: BaselineUncheckedUpdateOneWithoutProjectNestedInput
    datasets?: DatasetUncheckedUpdateManyWithoutProjectNestedInput
    evaluators?: EvaluatorUncheckedUpdateManyWithoutProjectNestedInput
    experiments?: ExperimentUncheckedUpdateManyWithoutProjectNestedInput
    githubIntegrations?: GithubIntegrationUncheckedUpdateManyWithoutProjectNestedInput
    ciToken?: ProjectCiTokenUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    model: string
    systemPrompt?: string | null
    temperature?: number | null
    topP?: number | null
    maxTokens?: number | null
    inputCostPerMillion?: number
    cachedInputCostPerMillion?: number
    outputCostPerMillion?: number
    allowedQualityDrop?: number
    cacheEnabled?: boolean
    cacheTtlSeconds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    topP?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    inputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    cachedInputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    outputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    cacheEnabled?: BoolFieldUpdateOperationsInput | boolean
    cacheTtlSeconds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    topP?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    inputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    cachedInputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    outputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    cacheEnabled?: BoolFieldUpdateOperationsInput | boolean
    cacheTtlSeconds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DatasetCreateInput = {
    id?: string
    name: string
    description?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutDatasetsInput
    experiments?: ExperimentCreateNestedManyWithoutDatasetInput
    testCases?: TestCaseCreateNestedManyWithoutDatasetInput
  }

  export type DatasetUncheckedCreateInput = {
    id?: string
    projectId: string
    name: string
    description?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    experiments?: ExperimentUncheckedCreateNestedManyWithoutDatasetInput
    testCases?: TestCaseUncheckedCreateNestedManyWithoutDatasetInput
  }

  export type DatasetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutDatasetsNestedInput
    experiments?: ExperimentUpdateManyWithoutDatasetNestedInput
    testCases?: TestCaseUpdateManyWithoutDatasetNestedInput
  }

  export type DatasetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    experiments?: ExperimentUncheckedUpdateManyWithoutDatasetNestedInput
    testCases?: TestCaseUncheckedUpdateManyWithoutDatasetNestedInput
  }

  export type DatasetCreateManyInput = {
    id?: string
    projectId: string
    name: string
    description?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DatasetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DatasetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestCaseCreateInput = {
    id?: string
    input: string
    expectedOutput?: string | null
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    results?: EvaluationResultCreateNestedManyWithoutTestCaseInput
    dataset: DatasetCreateNestedOneWithoutTestCasesInput
  }

  export type TestCaseUncheckedCreateInput = {
    id?: string
    datasetId: string
    input: string
    expectedOutput?: string | null
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    results?: EvaluationResultUncheckedCreateNestedManyWithoutTestCaseInput
  }

  export type TestCaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    input?: StringFieldUpdateOperationsInput | string
    expectedOutput?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    results?: EvaluationResultUpdateManyWithoutTestCaseNestedInput
    dataset?: DatasetUpdateOneRequiredWithoutTestCasesNestedInput
  }

  export type TestCaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    input?: StringFieldUpdateOperationsInput | string
    expectedOutput?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    results?: EvaluationResultUncheckedUpdateManyWithoutTestCaseNestedInput
  }

  export type TestCaseCreateManyInput = {
    id?: string
    datasetId: string
    input: string
    expectedOutput?: string | null
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestCaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    input?: StringFieldUpdateOperationsInput | string
    expectedOutput?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestCaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    input?: StringFieldUpdateOperationsInput | string
    expectedOutput?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluatorCreateInput = {
    id?: string
    name: string
    type: string
    config: string
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutEvaluatorsInput
  }

  export type EvaluatorUncheckedCreateInput = {
    id?: string
    projectId: string
    name: string
    type: string
    config: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EvaluatorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    config?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutEvaluatorsNestedInput
  }

  export type EvaluatorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    config?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluatorCreateManyInput = {
    id?: string
    projectId: string
    name: string
    type: string
    config: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EvaluatorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    config?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluatorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    config?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperimentCreateInput = {
    id?: string
    name: string
    model: string
    status?: string
    qualityScore?: number | null
    passRate?: number | null
    avgLatencyMs?: number | null
    totalTokens?: number
    totalCostUsd?: number
    cacheHitRate?: number
    cacheMissRate?: number
    llmCallsAvoided?: number
    cachedInputTokens?: number
    estimatedCostSavedUsd?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    allowedQualityDrop?: number
    errorMessage?: string | null
    failOnRegression?: boolean
    regressionDelta?: number | null
    regressionPassed?: boolean
    useCache?: boolean
    results?: EvaluationResultCreateNestedManyWithoutExperimentInput
    dataset: DatasetCreateNestedOneWithoutExperimentsInput
    project: ProjectCreateNestedOneWithoutExperimentsInput
  }

  export type ExperimentUncheckedCreateInput = {
    id?: string
    projectId: string
    datasetId: string
    name: string
    model: string
    status?: string
    qualityScore?: number | null
    passRate?: number | null
    avgLatencyMs?: number | null
    totalTokens?: number
    totalCostUsd?: number
    cacheHitRate?: number
    cacheMissRate?: number
    llmCallsAvoided?: number
    cachedInputTokens?: number
    estimatedCostSavedUsd?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    allowedQualityDrop?: number
    errorMessage?: string | null
    failOnRegression?: boolean
    regressionDelta?: number | null
    regressionPassed?: boolean
    useCache?: boolean
    results?: EvaluationResultUncheckedCreateNestedManyWithoutExperimentInput
  }

  export type ExperimentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    passRate?: NullableFloatFieldUpdateOperationsInput | number | null
    avgLatencyMs?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: IntFieldUpdateOperationsInput | number
    totalCostUsd?: FloatFieldUpdateOperationsInput | number
    cacheHitRate?: FloatFieldUpdateOperationsInput | number
    cacheMissRate?: FloatFieldUpdateOperationsInput | number
    llmCallsAvoided?: IntFieldUpdateOperationsInput | number
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostSavedUsd?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failOnRegression?: BoolFieldUpdateOperationsInput | boolean
    regressionDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    regressionPassed?: BoolFieldUpdateOperationsInput | boolean
    useCache?: BoolFieldUpdateOperationsInput | boolean
    results?: EvaluationResultUpdateManyWithoutExperimentNestedInput
    dataset?: DatasetUpdateOneRequiredWithoutExperimentsNestedInput
    project?: ProjectUpdateOneRequiredWithoutExperimentsNestedInput
  }

  export type ExperimentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    passRate?: NullableFloatFieldUpdateOperationsInput | number | null
    avgLatencyMs?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: IntFieldUpdateOperationsInput | number
    totalCostUsd?: FloatFieldUpdateOperationsInput | number
    cacheHitRate?: FloatFieldUpdateOperationsInput | number
    cacheMissRate?: FloatFieldUpdateOperationsInput | number
    llmCallsAvoided?: IntFieldUpdateOperationsInput | number
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostSavedUsd?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failOnRegression?: BoolFieldUpdateOperationsInput | boolean
    regressionDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    regressionPassed?: BoolFieldUpdateOperationsInput | boolean
    useCache?: BoolFieldUpdateOperationsInput | boolean
    results?: EvaluationResultUncheckedUpdateManyWithoutExperimentNestedInput
  }

  export type ExperimentCreateManyInput = {
    id?: string
    projectId: string
    datasetId: string
    name: string
    model: string
    status?: string
    qualityScore?: number | null
    passRate?: number | null
    avgLatencyMs?: number | null
    totalTokens?: number
    totalCostUsd?: number
    cacheHitRate?: number
    cacheMissRate?: number
    llmCallsAvoided?: number
    cachedInputTokens?: number
    estimatedCostSavedUsd?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    allowedQualityDrop?: number
    errorMessage?: string | null
    failOnRegression?: boolean
    regressionDelta?: number | null
    regressionPassed?: boolean
    useCache?: boolean
  }

  export type ExperimentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    passRate?: NullableFloatFieldUpdateOperationsInput | number | null
    avgLatencyMs?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: IntFieldUpdateOperationsInput | number
    totalCostUsd?: FloatFieldUpdateOperationsInput | number
    cacheHitRate?: FloatFieldUpdateOperationsInput | number
    cacheMissRate?: FloatFieldUpdateOperationsInput | number
    llmCallsAvoided?: IntFieldUpdateOperationsInput | number
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostSavedUsd?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failOnRegression?: BoolFieldUpdateOperationsInput | boolean
    regressionDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    regressionPassed?: BoolFieldUpdateOperationsInput | boolean
    useCache?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ExperimentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    passRate?: NullableFloatFieldUpdateOperationsInput | number | null
    avgLatencyMs?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: IntFieldUpdateOperationsInput | number
    totalCostUsd?: FloatFieldUpdateOperationsInput | number
    cacheHitRate?: FloatFieldUpdateOperationsInput | number
    cacheMissRate?: FloatFieldUpdateOperationsInput | number
    llmCallsAvoided?: IntFieldUpdateOperationsInput | number
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostSavedUsd?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failOnRegression?: BoolFieldUpdateOperationsInput | boolean
    regressionDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    regressionPassed?: BoolFieldUpdateOperationsInput | boolean
    useCache?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EvaluationResultCreateInput = {
    id?: string
    actualOutput: string
    score: number
    passed: boolean
    latencyMs?: number | null
    ttftMs?: number | null
    inputTokens?: number | null
    outputTokens?: number | null
    cacheHit?: boolean
    reason?: string | null
    createdAt?: Date | string
    cachedInputTokens?: number
    estimatedCostUsd?: number | null
    totalTokens?: number | null
    uncachedEstimatedCostUsd?: number | null
    experiment: ExperimentCreateNestedOneWithoutResultsInput
    testCase: TestCaseCreateNestedOneWithoutResultsInput
  }

  export type EvaluationResultUncheckedCreateInput = {
    id?: string
    experimentId: string
    testCaseId: string
    actualOutput: string
    score: number
    passed: boolean
    latencyMs?: number | null
    ttftMs?: number | null
    inputTokens?: number | null
    outputTokens?: number | null
    cacheHit?: boolean
    reason?: string | null
    createdAt?: Date | string
    cachedInputTokens?: number
    estimatedCostUsd?: number | null
    totalTokens?: number | null
    uncachedEstimatedCostUsd?: number | null
  }

  export type EvaluationResultUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actualOutput?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    passed?: BoolFieldUpdateOperationsInput | boolean
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    ttftMs?: NullableIntFieldUpdateOperationsInput | number | null
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cacheHit?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    uncachedEstimatedCostUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    experiment?: ExperimentUpdateOneRequiredWithoutResultsNestedInput
    testCase?: TestCaseUpdateOneRequiredWithoutResultsNestedInput
  }

  export type EvaluationResultUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    experimentId?: StringFieldUpdateOperationsInput | string
    testCaseId?: StringFieldUpdateOperationsInput | string
    actualOutput?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    passed?: BoolFieldUpdateOperationsInput | boolean
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    ttftMs?: NullableIntFieldUpdateOperationsInput | number | null
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cacheHit?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    uncachedEstimatedCostUsd?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type EvaluationResultCreateManyInput = {
    id?: string
    experimentId: string
    testCaseId: string
    actualOutput: string
    score: number
    passed: boolean
    latencyMs?: number | null
    ttftMs?: number | null
    inputTokens?: number | null
    outputTokens?: number | null
    cacheHit?: boolean
    reason?: string | null
    createdAt?: Date | string
    cachedInputTokens?: number
    estimatedCostUsd?: number | null
    totalTokens?: number | null
    uncachedEstimatedCostUsd?: number | null
  }

  export type EvaluationResultUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    actualOutput?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    passed?: BoolFieldUpdateOperationsInput | boolean
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    ttftMs?: NullableIntFieldUpdateOperationsInput | number | null
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cacheHit?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    uncachedEstimatedCostUsd?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type EvaluationResultUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    experimentId?: StringFieldUpdateOperationsInput | string
    testCaseId?: StringFieldUpdateOperationsInput | string
    actualOutput?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    passed?: BoolFieldUpdateOperationsInput | boolean
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    ttftMs?: NullableIntFieldUpdateOperationsInput | number | null
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cacheHit?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    uncachedEstimatedCostUsd?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type GithubIntegrationCreateInput = {
    id?: string
    repositoryName: string
    repositoryId?: string | null
    installationId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutGithubIntegrationsInput
  }

  export type GithubIntegrationUncheckedCreateInput = {
    id?: string
    projectId: string
    repositoryName: string
    repositoryId?: string | null
    installationId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GithubIntegrationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    repositoryName?: StringFieldUpdateOperationsInput | string
    repositoryId?: NullableStringFieldUpdateOperationsInput | string | null
    installationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutGithubIntegrationsNestedInput
  }

  export type GithubIntegrationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    repositoryName?: StringFieldUpdateOperationsInput | string
    repositoryId?: NullableStringFieldUpdateOperationsInput | string | null
    installationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GithubIntegrationCreateManyInput = {
    id?: string
    projectId: string
    repositoryName: string
    repositoryId?: string | null
    installationId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GithubIntegrationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    repositoryName?: StringFieldUpdateOperationsInput | string
    repositoryId?: NullableStringFieldUpdateOperationsInput | string | null
    installationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GithubIntegrationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    repositoryName?: StringFieldUpdateOperationsInput | string
    repositoryId?: NullableStringFieldUpdateOperationsInput | string | null
    installationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BaselineCreateInput = {
    id?: string
    experimentId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutBaselineInput
  }

  export type BaselineUncheckedCreateInput = {
    id?: string
    projectId: string
    experimentId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BaselineUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    experimentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutBaselineNestedInput
  }

  export type BaselineUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    experimentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BaselineCreateManyInput = {
    id?: string
    projectId: string
    experimentId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BaselineUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    experimentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BaselineUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    experimentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCiTokenCreateInput = {
    id?: string
    tokenHash: string
    tokenPrefix: string
    createdAt?: Date | string
    revokedAt?: Date | string | null
    project: ProjectCreateNestedOneWithoutCiTokenInput
  }

  export type ProjectCiTokenUncheckedCreateInput = {
    id?: string
    projectId: string
    tokenHash: string
    tokenPrefix: string
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type ProjectCiTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    tokenPrefix?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project?: ProjectUpdateOneRequiredWithoutCiTokenNestedInput
  }

  export type ProjectCiTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    tokenPrefix?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProjectCiTokenCreateManyInput = {
    id?: string
    projectId: string
    tokenHash: string
    tokenPrefix: string
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type ProjectCiTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    tokenPrefix?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProjectCiTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    tokenPrefix?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BaselineNullableScalarRelationFilter = {
    is?: BaselineWhereInput | null
    isNot?: BaselineWhereInput | null
  }

  export type DatasetListRelationFilter = {
    every?: DatasetWhereInput
    some?: DatasetWhereInput
    none?: DatasetWhereInput
  }

  export type EvaluatorListRelationFilter = {
    every?: EvaluatorWhereInput
    some?: EvaluatorWhereInput
    none?: EvaluatorWhereInput
  }

  export type ExperimentListRelationFilter = {
    every?: ExperimentWhereInput
    some?: ExperimentWhereInput
    none?: ExperimentWhereInput
  }

  export type GithubIntegrationListRelationFilter = {
    every?: GithubIntegrationWhereInput
    some?: GithubIntegrationWhereInput
    none?: GithubIntegrationWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProjectCiTokenNullableScalarRelationFilter = {
    is?: ProjectCiTokenWhereInput | null
    isNot?: ProjectCiTokenWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DatasetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EvaluatorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExperimentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GithubIntegrationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    model?: SortOrder
    systemPrompt?: SortOrder
    temperature?: SortOrder
    topP?: SortOrder
    maxTokens?: SortOrder
    inputCostPerMillion?: SortOrder
    cachedInputCostPerMillion?: SortOrder
    outputCostPerMillion?: SortOrder
    allowedQualityDrop?: SortOrder
    cacheEnabled?: SortOrder
    cacheTtlSeconds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    temperature?: SortOrder
    topP?: SortOrder
    maxTokens?: SortOrder
    inputCostPerMillion?: SortOrder
    cachedInputCostPerMillion?: SortOrder
    outputCostPerMillion?: SortOrder
    allowedQualityDrop?: SortOrder
    cacheTtlSeconds?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    model?: SortOrder
    systemPrompt?: SortOrder
    temperature?: SortOrder
    topP?: SortOrder
    maxTokens?: SortOrder
    inputCostPerMillion?: SortOrder
    cachedInputCostPerMillion?: SortOrder
    outputCostPerMillion?: SortOrder
    allowedQualityDrop?: SortOrder
    cacheEnabled?: SortOrder
    cacheTtlSeconds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    model?: SortOrder
    systemPrompt?: SortOrder
    temperature?: SortOrder
    topP?: SortOrder
    maxTokens?: SortOrder
    inputCostPerMillion?: SortOrder
    cachedInputCostPerMillion?: SortOrder
    outputCostPerMillion?: SortOrder
    allowedQualityDrop?: SortOrder
    cacheEnabled?: SortOrder
    cacheTtlSeconds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    temperature?: SortOrder
    topP?: SortOrder
    maxTokens?: SortOrder
    inputCostPerMillion?: SortOrder
    cachedInputCostPerMillion?: SortOrder
    outputCostPerMillion?: SortOrder
    allowedQualityDrop?: SortOrder
    cacheTtlSeconds?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type TestCaseListRelationFilter = {
    every?: TestCaseWhereInput
    some?: TestCaseWhereInput
    none?: TestCaseWhereInput
  }

  export type TestCaseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DatasetCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DatasetAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type DatasetMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DatasetMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DatasetSumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type EvaluationResultListRelationFilter = {
    every?: EvaluationResultWhereInput
    some?: EvaluationResultWhereInput
    none?: EvaluationResultWhereInput
  }

  export type DatasetScalarRelationFilter = {
    is?: DatasetWhereInput
    isNot?: DatasetWhereInput
  }

  export type EvaluationResultOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TestCaseCountOrderByAggregateInput = {
    id?: SortOrder
    datasetId?: SortOrder
    input?: SortOrder
    expectedOutput?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestCaseMaxOrderByAggregateInput = {
    id?: SortOrder
    datasetId?: SortOrder
    input?: SortOrder
    expectedOutput?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestCaseMinOrderByAggregateInput = {
    id?: SortOrder
    datasetId?: SortOrder
    input?: SortOrder
    expectedOutput?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EvaluatorCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    config?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EvaluatorMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    config?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EvaluatorMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    config?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExperimentCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    datasetId?: SortOrder
    name?: SortOrder
    model?: SortOrder
    status?: SortOrder
    qualityScore?: SortOrder
    passRate?: SortOrder
    avgLatencyMs?: SortOrder
    totalTokens?: SortOrder
    totalCostUsd?: SortOrder
    cacheHitRate?: SortOrder
    cacheMissRate?: SortOrder
    llmCallsAvoided?: SortOrder
    cachedInputTokens?: SortOrder
    estimatedCostSavedUsd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    allowedQualityDrop?: SortOrder
    errorMessage?: SortOrder
    failOnRegression?: SortOrder
    regressionDelta?: SortOrder
    regressionPassed?: SortOrder
    useCache?: SortOrder
  }

  export type ExperimentAvgOrderByAggregateInput = {
    qualityScore?: SortOrder
    passRate?: SortOrder
    avgLatencyMs?: SortOrder
    totalTokens?: SortOrder
    totalCostUsd?: SortOrder
    cacheHitRate?: SortOrder
    cacheMissRate?: SortOrder
    llmCallsAvoided?: SortOrder
    cachedInputTokens?: SortOrder
    estimatedCostSavedUsd?: SortOrder
    allowedQualityDrop?: SortOrder
    regressionDelta?: SortOrder
  }

  export type ExperimentMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    datasetId?: SortOrder
    name?: SortOrder
    model?: SortOrder
    status?: SortOrder
    qualityScore?: SortOrder
    passRate?: SortOrder
    avgLatencyMs?: SortOrder
    totalTokens?: SortOrder
    totalCostUsd?: SortOrder
    cacheHitRate?: SortOrder
    cacheMissRate?: SortOrder
    llmCallsAvoided?: SortOrder
    cachedInputTokens?: SortOrder
    estimatedCostSavedUsd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    allowedQualityDrop?: SortOrder
    errorMessage?: SortOrder
    failOnRegression?: SortOrder
    regressionDelta?: SortOrder
    regressionPassed?: SortOrder
    useCache?: SortOrder
  }

  export type ExperimentMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    datasetId?: SortOrder
    name?: SortOrder
    model?: SortOrder
    status?: SortOrder
    qualityScore?: SortOrder
    passRate?: SortOrder
    avgLatencyMs?: SortOrder
    totalTokens?: SortOrder
    totalCostUsd?: SortOrder
    cacheHitRate?: SortOrder
    cacheMissRate?: SortOrder
    llmCallsAvoided?: SortOrder
    cachedInputTokens?: SortOrder
    estimatedCostSavedUsd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    allowedQualityDrop?: SortOrder
    errorMessage?: SortOrder
    failOnRegression?: SortOrder
    regressionDelta?: SortOrder
    regressionPassed?: SortOrder
    useCache?: SortOrder
  }

  export type ExperimentSumOrderByAggregateInput = {
    qualityScore?: SortOrder
    passRate?: SortOrder
    avgLatencyMs?: SortOrder
    totalTokens?: SortOrder
    totalCostUsd?: SortOrder
    cacheHitRate?: SortOrder
    cacheMissRate?: SortOrder
    llmCallsAvoided?: SortOrder
    cachedInputTokens?: SortOrder
    estimatedCostSavedUsd?: SortOrder
    allowedQualityDrop?: SortOrder
    regressionDelta?: SortOrder
  }

  export type ExperimentScalarRelationFilter = {
    is?: ExperimentWhereInput
    isNot?: ExperimentWhereInput
  }

  export type TestCaseScalarRelationFilter = {
    is?: TestCaseWhereInput
    isNot?: TestCaseWhereInput
  }

  export type EvaluationResultCountOrderByAggregateInput = {
    id?: SortOrder
    experimentId?: SortOrder
    testCaseId?: SortOrder
    actualOutput?: SortOrder
    score?: SortOrder
    passed?: SortOrder
    latencyMs?: SortOrder
    ttftMs?: SortOrder
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    cacheHit?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
    cachedInputTokens?: SortOrder
    estimatedCostUsd?: SortOrder
    totalTokens?: SortOrder
    uncachedEstimatedCostUsd?: SortOrder
  }

  export type EvaluationResultAvgOrderByAggregateInput = {
    score?: SortOrder
    latencyMs?: SortOrder
    ttftMs?: SortOrder
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    cachedInputTokens?: SortOrder
    estimatedCostUsd?: SortOrder
    totalTokens?: SortOrder
    uncachedEstimatedCostUsd?: SortOrder
  }

  export type EvaluationResultMaxOrderByAggregateInput = {
    id?: SortOrder
    experimentId?: SortOrder
    testCaseId?: SortOrder
    actualOutput?: SortOrder
    score?: SortOrder
    passed?: SortOrder
    latencyMs?: SortOrder
    ttftMs?: SortOrder
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    cacheHit?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
    cachedInputTokens?: SortOrder
    estimatedCostUsd?: SortOrder
    totalTokens?: SortOrder
    uncachedEstimatedCostUsd?: SortOrder
  }

  export type EvaluationResultMinOrderByAggregateInput = {
    id?: SortOrder
    experimentId?: SortOrder
    testCaseId?: SortOrder
    actualOutput?: SortOrder
    score?: SortOrder
    passed?: SortOrder
    latencyMs?: SortOrder
    ttftMs?: SortOrder
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    cacheHit?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
    cachedInputTokens?: SortOrder
    estimatedCostUsd?: SortOrder
    totalTokens?: SortOrder
    uncachedEstimatedCostUsd?: SortOrder
  }

  export type EvaluationResultSumOrderByAggregateInput = {
    score?: SortOrder
    latencyMs?: SortOrder
    ttftMs?: SortOrder
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    cachedInputTokens?: SortOrder
    estimatedCostUsd?: SortOrder
    totalTokens?: SortOrder
    uncachedEstimatedCostUsd?: SortOrder
  }

  export type GithubIntegrationCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    repositoryName?: SortOrder
    repositoryId?: SortOrder
    installationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GithubIntegrationMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    repositoryName?: SortOrder
    repositoryId?: SortOrder
    installationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GithubIntegrationMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    repositoryName?: SortOrder
    repositoryId?: SortOrder
    installationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BaselineCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    experimentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BaselineMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    experimentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BaselineMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    experimentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ProjectCiTokenCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    tokenHash?: SortOrder
    tokenPrefix?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type ProjectCiTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    tokenHash?: SortOrder
    tokenPrefix?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type ProjectCiTokenMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    tokenHash?: SortOrder
    tokenPrefix?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ProjectCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProjectUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type BaselineCreateNestedOneWithoutProjectInput = {
    create?: XOR<BaselineCreateWithoutProjectInput, BaselineUncheckedCreateWithoutProjectInput>
    connectOrCreate?: BaselineCreateOrConnectWithoutProjectInput
    connect?: BaselineWhereUniqueInput
  }

  export type DatasetCreateNestedManyWithoutProjectInput = {
    create?: XOR<DatasetCreateWithoutProjectInput, DatasetUncheckedCreateWithoutProjectInput> | DatasetCreateWithoutProjectInput[] | DatasetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DatasetCreateOrConnectWithoutProjectInput | DatasetCreateOrConnectWithoutProjectInput[]
    createMany?: DatasetCreateManyProjectInputEnvelope
    connect?: DatasetWhereUniqueInput | DatasetWhereUniqueInput[]
  }

  export type EvaluatorCreateNestedManyWithoutProjectInput = {
    create?: XOR<EvaluatorCreateWithoutProjectInput, EvaluatorUncheckedCreateWithoutProjectInput> | EvaluatorCreateWithoutProjectInput[] | EvaluatorUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: EvaluatorCreateOrConnectWithoutProjectInput | EvaluatorCreateOrConnectWithoutProjectInput[]
    createMany?: EvaluatorCreateManyProjectInputEnvelope
    connect?: EvaluatorWhereUniqueInput | EvaluatorWhereUniqueInput[]
  }

  export type ExperimentCreateNestedManyWithoutProjectInput = {
    create?: XOR<ExperimentCreateWithoutProjectInput, ExperimentUncheckedCreateWithoutProjectInput> | ExperimentCreateWithoutProjectInput[] | ExperimentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ExperimentCreateOrConnectWithoutProjectInput | ExperimentCreateOrConnectWithoutProjectInput[]
    createMany?: ExperimentCreateManyProjectInputEnvelope
    connect?: ExperimentWhereUniqueInput | ExperimentWhereUniqueInput[]
  }

  export type GithubIntegrationCreateNestedManyWithoutProjectInput = {
    create?: XOR<GithubIntegrationCreateWithoutProjectInput, GithubIntegrationUncheckedCreateWithoutProjectInput> | GithubIntegrationCreateWithoutProjectInput[] | GithubIntegrationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: GithubIntegrationCreateOrConnectWithoutProjectInput | GithubIntegrationCreateOrConnectWithoutProjectInput[]
    createMany?: GithubIntegrationCreateManyProjectInputEnvelope
    connect?: GithubIntegrationWhereUniqueInput | GithubIntegrationWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectCiTokenCreateNestedOneWithoutProjectInput = {
    create?: XOR<ProjectCiTokenCreateWithoutProjectInput, ProjectCiTokenUncheckedCreateWithoutProjectInput>
    connectOrCreate?: ProjectCiTokenCreateOrConnectWithoutProjectInput
    connect?: ProjectCiTokenWhereUniqueInput
  }

  export type BaselineUncheckedCreateNestedOneWithoutProjectInput = {
    create?: XOR<BaselineCreateWithoutProjectInput, BaselineUncheckedCreateWithoutProjectInput>
    connectOrCreate?: BaselineCreateOrConnectWithoutProjectInput
    connect?: BaselineWhereUniqueInput
  }

  export type DatasetUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<DatasetCreateWithoutProjectInput, DatasetUncheckedCreateWithoutProjectInput> | DatasetCreateWithoutProjectInput[] | DatasetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DatasetCreateOrConnectWithoutProjectInput | DatasetCreateOrConnectWithoutProjectInput[]
    createMany?: DatasetCreateManyProjectInputEnvelope
    connect?: DatasetWhereUniqueInput | DatasetWhereUniqueInput[]
  }

  export type EvaluatorUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<EvaluatorCreateWithoutProjectInput, EvaluatorUncheckedCreateWithoutProjectInput> | EvaluatorCreateWithoutProjectInput[] | EvaluatorUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: EvaluatorCreateOrConnectWithoutProjectInput | EvaluatorCreateOrConnectWithoutProjectInput[]
    createMany?: EvaluatorCreateManyProjectInputEnvelope
    connect?: EvaluatorWhereUniqueInput | EvaluatorWhereUniqueInput[]
  }

  export type ExperimentUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ExperimentCreateWithoutProjectInput, ExperimentUncheckedCreateWithoutProjectInput> | ExperimentCreateWithoutProjectInput[] | ExperimentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ExperimentCreateOrConnectWithoutProjectInput | ExperimentCreateOrConnectWithoutProjectInput[]
    createMany?: ExperimentCreateManyProjectInputEnvelope
    connect?: ExperimentWhereUniqueInput | ExperimentWhereUniqueInput[]
  }

  export type GithubIntegrationUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<GithubIntegrationCreateWithoutProjectInput, GithubIntegrationUncheckedCreateWithoutProjectInput> | GithubIntegrationCreateWithoutProjectInput[] | GithubIntegrationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: GithubIntegrationCreateOrConnectWithoutProjectInput | GithubIntegrationCreateOrConnectWithoutProjectInput[]
    createMany?: GithubIntegrationCreateManyProjectInputEnvelope
    connect?: GithubIntegrationWhereUniqueInput | GithubIntegrationWhereUniqueInput[]
  }

  export type ProjectCiTokenUncheckedCreateNestedOneWithoutProjectInput = {
    create?: XOR<ProjectCiTokenCreateWithoutProjectInput, ProjectCiTokenUncheckedCreateWithoutProjectInput>
    connectOrCreate?: ProjectCiTokenCreateOrConnectWithoutProjectInput
    connect?: ProjectCiTokenWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BaselineUpdateOneWithoutProjectNestedInput = {
    create?: XOR<BaselineCreateWithoutProjectInput, BaselineUncheckedCreateWithoutProjectInput>
    connectOrCreate?: BaselineCreateOrConnectWithoutProjectInput
    upsert?: BaselineUpsertWithoutProjectInput
    disconnect?: BaselineWhereInput | boolean
    delete?: BaselineWhereInput | boolean
    connect?: BaselineWhereUniqueInput
    update?: XOR<XOR<BaselineUpdateToOneWithWhereWithoutProjectInput, BaselineUpdateWithoutProjectInput>, BaselineUncheckedUpdateWithoutProjectInput>
  }

  export type DatasetUpdateManyWithoutProjectNestedInput = {
    create?: XOR<DatasetCreateWithoutProjectInput, DatasetUncheckedCreateWithoutProjectInput> | DatasetCreateWithoutProjectInput[] | DatasetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DatasetCreateOrConnectWithoutProjectInput | DatasetCreateOrConnectWithoutProjectInput[]
    upsert?: DatasetUpsertWithWhereUniqueWithoutProjectInput | DatasetUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: DatasetCreateManyProjectInputEnvelope
    set?: DatasetWhereUniqueInput | DatasetWhereUniqueInput[]
    disconnect?: DatasetWhereUniqueInput | DatasetWhereUniqueInput[]
    delete?: DatasetWhereUniqueInput | DatasetWhereUniqueInput[]
    connect?: DatasetWhereUniqueInput | DatasetWhereUniqueInput[]
    update?: DatasetUpdateWithWhereUniqueWithoutProjectInput | DatasetUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: DatasetUpdateManyWithWhereWithoutProjectInput | DatasetUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: DatasetScalarWhereInput | DatasetScalarWhereInput[]
  }

  export type EvaluatorUpdateManyWithoutProjectNestedInput = {
    create?: XOR<EvaluatorCreateWithoutProjectInput, EvaluatorUncheckedCreateWithoutProjectInput> | EvaluatorCreateWithoutProjectInput[] | EvaluatorUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: EvaluatorCreateOrConnectWithoutProjectInput | EvaluatorCreateOrConnectWithoutProjectInput[]
    upsert?: EvaluatorUpsertWithWhereUniqueWithoutProjectInput | EvaluatorUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: EvaluatorCreateManyProjectInputEnvelope
    set?: EvaluatorWhereUniqueInput | EvaluatorWhereUniqueInput[]
    disconnect?: EvaluatorWhereUniqueInput | EvaluatorWhereUniqueInput[]
    delete?: EvaluatorWhereUniqueInput | EvaluatorWhereUniqueInput[]
    connect?: EvaluatorWhereUniqueInput | EvaluatorWhereUniqueInput[]
    update?: EvaluatorUpdateWithWhereUniqueWithoutProjectInput | EvaluatorUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: EvaluatorUpdateManyWithWhereWithoutProjectInput | EvaluatorUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: EvaluatorScalarWhereInput | EvaluatorScalarWhereInput[]
  }

  export type ExperimentUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ExperimentCreateWithoutProjectInput, ExperimentUncheckedCreateWithoutProjectInput> | ExperimentCreateWithoutProjectInput[] | ExperimentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ExperimentCreateOrConnectWithoutProjectInput | ExperimentCreateOrConnectWithoutProjectInput[]
    upsert?: ExperimentUpsertWithWhereUniqueWithoutProjectInput | ExperimentUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ExperimentCreateManyProjectInputEnvelope
    set?: ExperimentWhereUniqueInput | ExperimentWhereUniqueInput[]
    disconnect?: ExperimentWhereUniqueInput | ExperimentWhereUniqueInput[]
    delete?: ExperimentWhereUniqueInput | ExperimentWhereUniqueInput[]
    connect?: ExperimentWhereUniqueInput | ExperimentWhereUniqueInput[]
    update?: ExperimentUpdateWithWhereUniqueWithoutProjectInput | ExperimentUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ExperimentUpdateManyWithWhereWithoutProjectInput | ExperimentUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ExperimentScalarWhereInput | ExperimentScalarWhereInput[]
  }

  export type GithubIntegrationUpdateManyWithoutProjectNestedInput = {
    create?: XOR<GithubIntegrationCreateWithoutProjectInput, GithubIntegrationUncheckedCreateWithoutProjectInput> | GithubIntegrationCreateWithoutProjectInput[] | GithubIntegrationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: GithubIntegrationCreateOrConnectWithoutProjectInput | GithubIntegrationCreateOrConnectWithoutProjectInput[]
    upsert?: GithubIntegrationUpsertWithWhereUniqueWithoutProjectInput | GithubIntegrationUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: GithubIntegrationCreateManyProjectInputEnvelope
    set?: GithubIntegrationWhereUniqueInput | GithubIntegrationWhereUniqueInput[]
    disconnect?: GithubIntegrationWhereUniqueInput | GithubIntegrationWhereUniqueInput[]
    delete?: GithubIntegrationWhereUniqueInput | GithubIntegrationWhereUniqueInput[]
    connect?: GithubIntegrationWhereUniqueInput | GithubIntegrationWhereUniqueInput[]
    update?: GithubIntegrationUpdateWithWhereUniqueWithoutProjectInput | GithubIntegrationUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: GithubIntegrationUpdateManyWithWhereWithoutProjectInput | GithubIntegrationUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: GithubIntegrationScalarWhereInput | GithubIntegrationScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsInput, UserUpdateWithoutProjectsInput>, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type ProjectCiTokenUpdateOneWithoutProjectNestedInput = {
    create?: XOR<ProjectCiTokenCreateWithoutProjectInput, ProjectCiTokenUncheckedCreateWithoutProjectInput>
    connectOrCreate?: ProjectCiTokenCreateOrConnectWithoutProjectInput
    upsert?: ProjectCiTokenUpsertWithoutProjectInput
    disconnect?: ProjectCiTokenWhereInput | boolean
    delete?: ProjectCiTokenWhereInput | boolean
    connect?: ProjectCiTokenWhereUniqueInput
    update?: XOR<XOR<ProjectCiTokenUpdateToOneWithWhereWithoutProjectInput, ProjectCiTokenUpdateWithoutProjectInput>, ProjectCiTokenUncheckedUpdateWithoutProjectInput>
  }

  export type BaselineUncheckedUpdateOneWithoutProjectNestedInput = {
    create?: XOR<BaselineCreateWithoutProjectInput, BaselineUncheckedCreateWithoutProjectInput>
    connectOrCreate?: BaselineCreateOrConnectWithoutProjectInput
    upsert?: BaselineUpsertWithoutProjectInput
    disconnect?: BaselineWhereInput | boolean
    delete?: BaselineWhereInput | boolean
    connect?: BaselineWhereUniqueInput
    update?: XOR<XOR<BaselineUpdateToOneWithWhereWithoutProjectInput, BaselineUpdateWithoutProjectInput>, BaselineUncheckedUpdateWithoutProjectInput>
  }

  export type DatasetUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<DatasetCreateWithoutProjectInput, DatasetUncheckedCreateWithoutProjectInput> | DatasetCreateWithoutProjectInput[] | DatasetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DatasetCreateOrConnectWithoutProjectInput | DatasetCreateOrConnectWithoutProjectInput[]
    upsert?: DatasetUpsertWithWhereUniqueWithoutProjectInput | DatasetUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: DatasetCreateManyProjectInputEnvelope
    set?: DatasetWhereUniqueInput | DatasetWhereUniqueInput[]
    disconnect?: DatasetWhereUniqueInput | DatasetWhereUniqueInput[]
    delete?: DatasetWhereUniqueInput | DatasetWhereUniqueInput[]
    connect?: DatasetWhereUniqueInput | DatasetWhereUniqueInput[]
    update?: DatasetUpdateWithWhereUniqueWithoutProjectInput | DatasetUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: DatasetUpdateManyWithWhereWithoutProjectInput | DatasetUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: DatasetScalarWhereInput | DatasetScalarWhereInput[]
  }

  export type EvaluatorUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<EvaluatorCreateWithoutProjectInput, EvaluatorUncheckedCreateWithoutProjectInput> | EvaluatorCreateWithoutProjectInput[] | EvaluatorUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: EvaluatorCreateOrConnectWithoutProjectInput | EvaluatorCreateOrConnectWithoutProjectInput[]
    upsert?: EvaluatorUpsertWithWhereUniqueWithoutProjectInput | EvaluatorUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: EvaluatorCreateManyProjectInputEnvelope
    set?: EvaluatorWhereUniqueInput | EvaluatorWhereUniqueInput[]
    disconnect?: EvaluatorWhereUniqueInput | EvaluatorWhereUniqueInput[]
    delete?: EvaluatorWhereUniqueInput | EvaluatorWhereUniqueInput[]
    connect?: EvaluatorWhereUniqueInput | EvaluatorWhereUniqueInput[]
    update?: EvaluatorUpdateWithWhereUniqueWithoutProjectInput | EvaluatorUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: EvaluatorUpdateManyWithWhereWithoutProjectInput | EvaluatorUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: EvaluatorScalarWhereInput | EvaluatorScalarWhereInput[]
  }

  export type ExperimentUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ExperimentCreateWithoutProjectInput, ExperimentUncheckedCreateWithoutProjectInput> | ExperimentCreateWithoutProjectInput[] | ExperimentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ExperimentCreateOrConnectWithoutProjectInput | ExperimentCreateOrConnectWithoutProjectInput[]
    upsert?: ExperimentUpsertWithWhereUniqueWithoutProjectInput | ExperimentUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ExperimentCreateManyProjectInputEnvelope
    set?: ExperimentWhereUniqueInput | ExperimentWhereUniqueInput[]
    disconnect?: ExperimentWhereUniqueInput | ExperimentWhereUniqueInput[]
    delete?: ExperimentWhereUniqueInput | ExperimentWhereUniqueInput[]
    connect?: ExperimentWhereUniqueInput | ExperimentWhereUniqueInput[]
    update?: ExperimentUpdateWithWhereUniqueWithoutProjectInput | ExperimentUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ExperimentUpdateManyWithWhereWithoutProjectInput | ExperimentUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ExperimentScalarWhereInput | ExperimentScalarWhereInput[]
  }

  export type GithubIntegrationUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<GithubIntegrationCreateWithoutProjectInput, GithubIntegrationUncheckedCreateWithoutProjectInput> | GithubIntegrationCreateWithoutProjectInput[] | GithubIntegrationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: GithubIntegrationCreateOrConnectWithoutProjectInput | GithubIntegrationCreateOrConnectWithoutProjectInput[]
    upsert?: GithubIntegrationUpsertWithWhereUniqueWithoutProjectInput | GithubIntegrationUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: GithubIntegrationCreateManyProjectInputEnvelope
    set?: GithubIntegrationWhereUniqueInput | GithubIntegrationWhereUniqueInput[]
    disconnect?: GithubIntegrationWhereUniqueInput | GithubIntegrationWhereUniqueInput[]
    delete?: GithubIntegrationWhereUniqueInput | GithubIntegrationWhereUniqueInput[]
    connect?: GithubIntegrationWhereUniqueInput | GithubIntegrationWhereUniqueInput[]
    update?: GithubIntegrationUpdateWithWhereUniqueWithoutProjectInput | GithubIntegrationUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: GithubIntegrationUpdateManyWithWhereWithoutProjectInput | GithubIntegrationUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: GithubIntegrationScalarWhereInput | GithubIntegrationScalarWhereInput[]
  }

  export type ProjectCiTokenUncheckedUpdateOneWithoutProjectNestedInput = {
    create?: XOR<ProjectCiTokenCreateWithoutProjectInput, ProjectCiTokenUncheckedCreateWithoutProjectInput>
    connectOrCreate?: ProjectCiTokenCreateOrConnectWithoutProjectInput
    upsert?: ProjectCiTokenUpsertWithoutProjectInput
    disconnect?: ProjectCiTokenWhereInput | boolean
    delete?: ProjectCiTokenWhereInput | boolean
    connect?: ProjectCiTokenWhereUniqueInput
    update?: XOR<XOR<ProjectCiTokenUpdateToOneWithWhereWithoutProjectInput, ProjectCiTokenUpdateWithoutProjectInput>, ProjectCiTokenUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectCreateNestedOneWithoutDatasetsInput = {
    create?: XOR<ProjectCreateWithoutDatasetsInput, ProjectUncheckedCreateWithoutDatasetsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutDatasetsInput
    connect?: ProjectWhereUniqueInput
  }

  export type ExperimentCreateNestedManyWithoutDatasetInput = {
    create?: XOR<ExperimentCreateWithoutDatasetInput, ExperimentUncheckedCreateWithoutDatasetInput> | ExperimentCreateWithoutDatasetInput[] | ExperimentUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: ExperimentCreateOrConnectWithoutDatasetInput | ExperimentCreateOrConnectWithoutDatasetInput[]
    createMany?: ExperimentCreateManyDatasetInputEnvelope
    connect?: ExperimentWhereUniqueInput | ExperimentWhereUniqueInput[]
  }

  export type TestCaseCreateNestedManyWithoutDatasetInput = {
    create?: XOR<TestCaseCreateWithoutDatasetInput, TestCaseUncheckedCreateWithoutDatasetInput> | TestCaseCreateWithoutDatasetInput[] | TestCaseUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: TestCaseCreateOrConnectWithoutDatasetInput | TestCaseCreateOrConnectWithoutDatasetInput[]
    createMany?: TestCaseCreateManyDatasetInputEnvelope
    connect?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
  }

  export type ExperimentUncheckedCreateNestedManyWithoutDatasetInput = {
    create?: XOR<ExperimentCreateWithoutDatasetInput, ExperimentUncheckedCreateWithoutDatasetInput> | ExperimentCreateWithoutDatasetInput[] | ExperimentUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: ExperimentCreateOrConnectWithoutDatasetInput | ExperimentCreateOrConnectWithoutDatasetInput[]
    createMany?: ExperimentCreateManyDatasetInputEnvelope
    connect?: ExperimentWhereUniqueInput | ExperimentWhereUniqueInput[]
  }

  export type TestCaseUncheckedCreateNestedManyWithoutDatasetInput = {
    create?: XOR<TestCaseCreateWithoutDatasetInput, TestCaseUncheckedCreateWithoutDatasetInput> | TestCaseCreateWithoutDatasetInput[] | TestCaseUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: TestCaseCreateOrConnectWithoutDatasetInput | TestCaseCreateOrConnectWithoutDatasetInput[]
    createMany?: TestCaseCreateManyDatasetInputEnvelope
    connect?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
  }

  export type ProjectUpdateOneRequiredWithoutDatasetsNestedInput = {
    create?: XOR<ProjectCreateWithoutDatasetsInput, ProjectUncheckedCreateWithoutDatasetsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutDatasetsInput
    upsert?: ProjectUpsertWithoutDatasetsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutDatasetsInput, ProjectUpdateWithoutDatasetsInput>, ProjectUncheckedUpdateWithoutDatasetsInput>
  }

  export type ExperimentUpdateManyWithoutDatasetNestedInput = {
    create?: XOR<ExperimentCreateWithoutDatasetInput, ExperimentUncheckedCreateWithoutDatasetInput> | ExperimentCreateWithoutDatasetInput[] | ExperimentUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: ExperimentCreateOrConnectWithoutDatasetInput | ExperimentCreateOrConnectWithoutDatasetInput[]
    upsert?: ExperimentUpsertWithWhereUniqueWithoutDatasetInput | ExperimentUpsertWithWhereUniqueWithoutDatasetInput[]
    createMany?: ExperimentCreateManyDatasetInputEnvelope
    set?: ExperimentWhereUniqueInput | ExperimentWhereUniqueInput[]
    disconnect?: ExperimentWhereUniqueInput | ExperimentWhereUniqueInput[]
    delete?: ExperimentWhereUniqueInput | ExperimentWhereUniqueInput[]
    connect?: ExperimentWhereUniqueInput | ExperimentWhereUniqueInput[]
    update?: ExperimentUpdateWithWhereUniqueWithoutDatasetInput | ExperimentUpdateWithWhereUniqueWithoutDatasetInput[]
    updateMany?: ExperimentUpdateManyWithWhereWithoutDatasetInput | ExperimentUpdateManyWithWhereWithoutDatasetInput[]
    deleteMany?: ExperimentScalarWhereInput | ExperimentScalarWhereInput[]
  }

  export type TestCaseUpdateManyWithoutDatasetNestedInput = {
    create?: XOR<TestCaseCreateWithoutDatasetInput, TestCaseUncheckedCreateWithoutDatasetInput> | TestCaseCreateWithoutDatasetInput[] | TestCaseUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: TestCaseCreateOrConnectWithoutDatasetInput | TestCaseCreateOrConnectWithoutDatasetInput[]
    upsert?: TestCaseUpsertWithWhereUniqueWithoutDatasetInput | TestCaseUpsertWithWhereUniqueWithoutDatasetInput[]
    createMany?: TestCaseCreateManyDatasetInputEnvelope
    set?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    disconnect?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    delete?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    connect?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    update?: TestCaseUpdateWithWhereUniqueWithoutDatasetInput | TestCaseUpdateWithWhereUniqueWithoutDatasetInput[]
    updateMany?: TestCaseUpdateManyWithWhereWithoutDatasetInput | TestCaseUpdateManyWithWhereWithoutDatasetInput[]
    deleteMany?: TestCaseScalarWhereInput | TestCaseScalarWhereInput[]
  }

  export type ExperimentUncheckedUpdateManyWithoutDatasetNestedInput = {
    create?: XOR<ExperimentCreateWithoutDatasetInput, ExperimentUncheckedCreateWithoutDatasetInput> | ExperimentCreateWithoutDatasetInput[] | ExperimentUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: ExperimentCreateOrConnectWithoutDatasetInput | ExperimentCreateOrConnectWithoutDatasetInput[]
    upsert?: ExperimentUpsertWithWhereUniqueWithoutDatasetInput | ExperimentUpsertWithWhereUniqueWithoutDatasetInput[]
    createMany?: ExperimentCreateManyDatasetInputEnvelope
    set?: ExperimentWhereUniqueInput | ExperimentWhereUniqueInput[]
    disconnect?: ExperimentWhereUniqueInput | ExperimentWhereUniqueInput[]
    delete?: ExperimentWhereUniqueInput | ExperimentWhereUniqueInput[]
    connect?: ExperimentWhereUniqueInput | ExperimentWhereUniqueInput[]
    update?: ExperimentUpdateWithWhereUniqueWithoutDatasetInput | ExperimentUpdateWithWhereUniqueWithoutDatasetInput[]
    updateMany?: ExperimentUpdateManyWithWhereWithoutDatasetInput | ExperimentUpdateManyWithWhereWithoutDatasetInput[]
    deleteMany?: ExperimentScalarWhereInput | ExperimentScalarWhereInput[]
  }

  export type TestCaseUncheckedUpdateManyWithoutDatasetNestedInput = {
    create?: XOR<TestCaseCreateWithoutDatasetInput, TestCaseUncheckedCreateWithoutDatasetInput> | TestCaseCreateWithoutDatasetInput[] | TestCaseUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: TestCaseCreateOrConnectWithoutDatasetInput | TestCaseCreateOrConnectWithoutDatasetInput[]
    upsert?: TestCaseUpsertWithWhereUniqueWithoutDatasetInput | TestCaseUpsertWithWhereUniqueWithoutDatasetInput[]
    createMany?: TestCaseCreateManyDatasetInputEnvelope
    set?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    disconnect?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    delete?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    connect?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    update?: TestCaseUpdateWithWhereUniqueWithoutDatasetInput | TestCaseUpdateWithWhereUniqueWithoutDatasetInput[]
    updateMany?: TestCaseUpdateManyWithWhereWithoutDatasetInput | TestCaseUpdateManyWithWhereWithoutDatasetInput[]
    deleteMany?: TestCaseScalarWhereInput | TestCaseScalarWhereInput[]
  }

  export type EvaluationResultCreateNestedManyWithoutTestCaseInput = {
    create?: XOR<EvaluationResultCreateWithoutTestCaseInput, EvaluationResultUncheckedCreateWithoutTestCaseInput> | EvaluationResultCreateWithoutTestCaseInput[] | EvaluationResultUncheckedCreateWithoutTestCaseInput[]
    connectOrCreate?: EvaluationResultCreateOrConnectWithoutTestCaseInput | EvaluationResultCreateOrConnectWithoutTestCaseInput[]
    createMany?: EvaluationResultCreateManyTestCaseInputEnvelope
    connect?: EvaluationResultWhereUniqueInput | EvaluationResultWhereUniqueInput[]
  }

  export type DatasetCreateNestedOneWithoutTestCasesInput = {
    create?: XOR<DatasetCreateWithoutTestCasesInput, DatasetUncheckedCreateWithoutTestCasesInput>
    connectOrCreate?: DatasetCreateOrConnectWithoutTestCasesInput
    connect?: DatasetWhereUniqueInput
  }

  export type EvaluationResultUncheckedCreateNestedManyWithoutTestCaseInput = {
    create?: XOR<EvaluationResultCreateWithoutTestCaseInput, EvaluationResultUncheckedCreateWithoutTestCaseInput> | EvaluationResultCreateWithoutTestCaseInput[] | EvaluationResultUncheckedCreateWithoutTestCaseInput[]
    connectOrCreate?: EvaluationResultCreateOrConnectWithoutTestCaseInput | EvaluationResultCreateOrConnectWithoutTestCaseInput[]
    createMany?: EvaluationResultCreateManyTestCaseInputEnvelope
    connect?: EvaluationResultWhereUniqueInput | EvaluationResultWhereUniqueInput[]
  }

  export type EvaluationResultUpdateManyWithoutTestCaseNestedInput = {
    create?: XOR<EvaluationResultCreateWithoutTestCaseInput, EvaluationResultUncheckedCreateWithoutTestCaseInput> | EvaluationResultCreateWithoutTestCaseInput[] | EvaluationResultUncheckedCreateWithoutTestCaseInput[]
    connectOrCreate?: EvaluationResultCreateOrConnectWithoutTestCaseInput | EvaluationResultCreateOrConnectWithoutTestCaseInput[]
    upsert?: EvaluationResultUpsertWithWhereUniqueWithoutTestCaseInput | EvaluationResultUpsertWithWhereUniqueWithoutTestCaseInput[]
    createMany?: EvaluationResultCreateManyTestCaseInputEnvelope
    set?: EvaluationResultWhereUniqueInput | EvaluationResultWhereUniqueInput[]
    disconnect?: EvaluationResultWhereUniqueInput | EvaluationResultWhereUniqueInput[]
    delete?: EvaluationResultWhereUniqueInput | EvaluationResultWhereUniqueInput[]
    connect?: EvaluationResultWhereUniqueInput | EvaluationResultWhereUniqueInput[]
    update?: EvaluationResultUpdateWithWhereUniqueWithoutTestCaseInput | EvaluationResultUpdateWithWhereUniqueWithoutTestCaseInput[]
    updateMany?: EvaluationResultUpdateManyWithWhereWithoutTestCaseInput | EvaluationResultUpdateManyWithWhereWithoutTestCaseInput[]
    deleteMany?: EvaluationResultScalarWhereInput | EvaluationResultScalarWhereInput[]
  }

  export type DatasetUpdateOneRequiredWithoutTestCasesNestedInput = {
    create?: XOR<DatasetCreateWithoutTestCasesInput, DatasetUncheckedCreateWithoutTestCasesInput>
    connectOrCreate?: DatasetCreateOrConnectWithoutTestCasesInput
    upsert?: DatasetUpsertWithoutTestCasesInput
    connect?: DatasetWhereUniqueInput
    update?: XOR<XOR<DatasetUpdateToOneWithWhereWithoutTestCasesInput, DatasetUpdateWithoutTestCasesInput>, DatasetUncheckedUpdateWithoutTestCasesInput>
  }

  export type EvaluationResultUncheckedUpdateManyWithoutTestCaseNestedInput = {
    create?: XOR<EvaluationResultCreateWithoutTestCaseInput, EvaluationResultUncheckedCreateWithoutTestCaseInput> | EvaluationResultCreateWithoutTestCaseInput[] | EvaluationResultUncheckedCreateWithoutTestCaseInput[]
    connectOrCreate?: EvaluationResultCreateOrConnectWithoutTestCaseInput | EvaluationResultCreateOrConnectWithoutTestCaseInput[]
    upsert?: EvaluationResultUpsertWithWhereUniqueWithoutTestCaseInput | EvaluationResultUpsertWithWhereUniqueWithoutTestCaseInput[]
    createMany?: EvaluationResultCreateManyTestCaseInputEnvelope
    set?: EvaluationResultWhereUniqueInput | EvaluationResultWhereUniqueInput[]
    disconnect?: EvaluationResultWhereUniqueInput | EvaluationResultWhereUniqueInput[]
    delete?: EvaluationResultWhereUniqueInput | EvaluationResultWhereUniqueInput[]
    connect?: EvaluationResultWhereUniqueInput | EvaluationResultWhereUniqueInput[]
    update?: EvaluationResultUpdateWithWhereUniqueWithoutTestCaseInput | EvaluationResultUpdateWithWhereUniqueWithoutTestCaseInput[]
    updateMany?: EvaluationResultUpdateManyWithWhereWithoutTestCaseInput | EvaluationResultUpdateManyWithWhereWithoutTestCaseInput[]
    deleteMany?: EvaluationResultScalarWhereInput | EvaluationResultScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutEvaluatorsInput = {
    create?: XOR<ProjectCreateWithoutEvaluatorsInput, ProjectUncheckedCreateWithoutEvaluatorsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutEvaluatorsInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutEvaluatorsNestedInput = {
    create?: XOR<ProjectCreateWithoutEvaluatorsInput, ProjectUncheckedCreateWithoutEvaluatorsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutEvaluatorsInput
    upsert?: ProjectUpsertWithoutEvaluatorsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutEvaluatorsInput, ProjectUpdateWithoutEvaluatorsInput>, ProjectUncheckedUpdateWithoutEvaluatorsInput>
  }

  export type EvaluationResultCreateNestedManyWithoutExperimentInput = {
    create?: XOR<EvaluationResultCreateWithoutExperimentInput, EvaluationResultUncheckedCreateWithoutExperimentInput> | EvaluationResultCreateWithoutExperimentInput[] | EvaluationResultUncheckedCreateWithoutExperimentInput[]
    connectOrCreate?: EvaluationResultCreateOrConnectWithoutExperimentInput | EvaluationResultCreateOrConnectWithoutExperimentInput[]
    createMany?: EvaluationResultCreateManyExperimentInputEnvelope
    connect?: EvaluationResultWhereUniqueInput | EvaluationResultWhereUniqueInput[]
  }

  export type DatasetCreateNestedOneWithoutExperimentsInput = {
    create?: XOR<DatasetCreateWithoutExperimentsInput, DatasetUncheckedCreateWithoutExperimentsInput>
    connectOrCreate?: DatasetCreateOrConnectWithoutExperimentsInput
    connect?: DatasetWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutExperimentsInput = {
    create?: XOR<ProjectCreateWithoutExperimentsInput, ProjectUncheckedCreateWithoutExperimentsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutExperimentsInput
    connect?: ProjectWhereUniqueInput
  }

  export type EvaluationResultUncheckedCreateNestedManyWithoutExperimentInput = {
    create?: XOR<EvaluationResultCreateWithoutExperimentInput, EvaluationResultUncheckedCreateWithoutExperimentInput> | EvaluationResultCreateWithoutExperimentInput[] | EvaluationResultUncheckedCreateWithoutExperimentInput[]
    connectOrCreate?: EvaluationResultCreateOrConnectWithoutExperimentInput | EvaluationResultCreateOrConnectWithoutExperimentInput[]
    createMany?: EvaluationResultCreateManyExperimentInputEnvelope
    connect?: EvaluationResultWhereUniqueInput | EvaluationResultWhereUniqueInput[]
  }

  export type EvaluationResultUpdateManyWithoutExperimentNestedInput = {
    create?: XOR<EvaluationResultCreateWithoutExperimentInput, EvaluationResultUncheckedCreateWithoutExperimentInput> | EvaluationResultCreateWithoutExperimentInput[] | EvaluationResultUncheckedCreateWithoutExperimentInput[]
    connectOrCreate?: EvaluationResultCreateOrConnectWithoutExperimentInput | EvaluationResultCreateOrConnectWithoutExperimentInput[]
    upsert?: EvaluationResultUpsertWithWhereUniqueWithoutExperimentInput | EvaluationResultUpsertWithWhereUniqueWithoutExperimentInput[]
    createMany?: EvaluationResultCreateManyExperimentInputEnvelope
    set?: EvaluationResultWhereUniqueInput | EvaluationResultWhereUniqueInput[]
    disconnect?: EvaluationResultWhereUniqueInput | EvaluationResultWhereUniqueInput[]
    delete?: EvaluationResultWhereUniqueInput | EvaluationResultWhereUniqueInput[]
    connect?: EvaluationResultWhereUniqueInput | EvaluationResultWhereUniqueInput[]
    update?: EvaluationResultUpdateWithWhereUniqueWithoutExperimentInput | EvaluationResultUpdateWithWhereUniqueWithoutExperimentInput[]
    updateMany?: EvaluationResultUpdateManyWithWhereWithoutExperimentInput | EvaluationResultUpdateManyWithWhereWithoutExperimentInput[]
    deleteMany?: EvaluationResultScalarWhereInput | EvaluationResultScalarWhereInput[]
  }

  export type DatasetUpdateOneRequiredWithoutExperimentsNestedInput = {
    create?: XOR<DatasetCreateWithoutExperimentsInput, DatasetUncheckedCreateWithoutExperimentsInput>
    connectOrCreate?: DatasetCreateOrConnectWithoutExperimentsInput
    upsert?: DatasetUpsertWithoutExperimentsInput
    connect?: DatasetWhereUniqueInput
    update?: XOR<XOR<DatasetUpdateToOneWithWhereWithoutExperimentsInput, DatasetUpdateWithoutExperimentsInput>, DatasetUncheckedUpdateWithoutExperimentsInput>
  }

  export type ProjectUpdateOneRequiredWithoutExperimentsNestedInput = {
    create?: XOR<ProjectCreateWithoutExperimentsInput, ProjectUncheckedCreateWithoutExperimentsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutExperimentsInput
    upsert?: ProjectUpsertWithoutExperimentsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutExperimentsInput, ProjectUpdateWithoutExperimentsInput>, ProjectUncheckedUpdateWithoutExperimentsInput>
  }

  export type EvaluationResultUncheckedUpdateManyWithoutExperimentNestedInput = {
    create?: XOR<EvaluationResultCreateWithoutExperimentInput, EvaluationResultUncheckedCreateWithoutExperimentInput> | EvaluationResultCreateWithoutExperimentInput[] | EvaluationResultUncheckedCreateWithoutExperimentInput[]
    connectOrCreate?: EvaluationResultCreateOrConnectWithoutExperimentInput | EvaluationResultCreateOrConnectWithoutExperimentInput[]
    upsert?: EvaluationResultUpsertWithWhereUniqueWithoutExperimentInput | EvaluationResultUpsertWithWhereUniqueWithoutExperimentInput[]
    createMany?: EvaluationResultCreateManyExperimentInputEnvelope
    set?: EvaluationResultWhereUniqueInput | EvaluationResultWhereUniqueInput[]
    disconnect?: EvaluationResultWhereUniqueInput | EvaluationResultWhereUniqueInput[]
    delete?: EvaluationResultWhereUniqueInput | EvaluationResultWhereUniqueInput[]
    connect?: EvaluationResultWhereUniqueInput | EvaluationResultWhereUniqueInput[]
    update?: EvaluationResultUpdateWithWhereUniqueWithoutExperimentInput | EvaluationResultUpdateWithWhereUniqueWithoutExperimentInput[]
    updateMany?: EvaluationResultUpdateManyWithWhereWithoutExperimentInput | EvaluationResultUpdateManyWithWhereWithoutExperimentInput[]
    deleteMany?: EvaluationResultScalarWhereInput | EvaluationResultScalarWhereInput[]
  }

  export type ExperimentCreateNestedOneWithoutResultsInput = {
    create?: XOR<ExperimentCreateWithoutResultsInput, ExperimentUncheckedCreateWithoutResultsInput>
    connectOrCreate?: ExperimentCreateOrConnectWithoutResultsInput
    connect?: ExperimentWhereUniqueInput
  }

  export type TestCaseCreateNestedOneWithoutResultsInput = {
    create?: XOR<TestCaseCreateWithoutResultsInput, TestCaseUncheckedCreateWithoutResultsInput>
    connectOrCreate?: TestCaseCreateOrConnectWithoutResultsInput
    connect?: TestCaseWhereUniqueInput
  }

  export type ExperimentUpdateOneRequiredWithoutResultsNestedInput = {
    create?: XOR<ExperimentCreateWithoutResultsInput, ExperimentUncheckedCreateWithoutResultsInput>
    connectOrCreate?: ExperimentCreateOrConnectWithoutResultsInput
    upsert?: ExperimentUpsertWithoutResultsInput
    connect?: ExperimentWhereUniqueInput
    update?: XOR<XOR<ExperimentUpdateToOneWithWhereWithoutResultsInput, ExperimentUpdateWithoutResultsInput>, ExperimentUncheckedUpdateWithoutResultsInput>
  }

  export type TestCaseUpdateOneRequiredWithoutResultsNestedInput = {
    create?: XOR<TestCaseCreateWithoutResultsInput, TestCaseUncheckedCreateWithoutResultsInput>
    connectOrCreate?: TestCaseCreateOrConnectWithoutResultsInput
    upsert?: TestCaseUpsertWithoutResultsInput
    connect?: TestCaseWhereUniqueInput
    update?: XOR<XOR<TestCaseUpdateToOneWithWhereWithoutResultsInput, TestCaseUpdateWithoutResultsInput>, TestCaseUncheckedUpdateWithoutResultsInput>
  }

  export type ProjectCreateNestedOneWithoutGithubIntegrationsInput = {
    create?: XOR<ProjectCreateWithoutGithubIntegrationsInput, ProjectUncheckedCreateWithoutGithubIntegrationsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutGithubIntegrationsInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutGithubIntegrationsNestedInput = {
    create?: XOR<ProjectCreateWithoutGithubIntegrationsInput, ProjectUncheckedCreateWithoutGithubIntegrationsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutGithubIntegrationsInput
    upsert?: ProjectUpsertWithoutGithubIntegrationsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutGithubIntegrationsInput, ProjectUpdateWithoutGithubIntegrationsInput>, ProjectUncheckedUpdateWithoutGithubIntegrationsInput>
  }

  export type ProjectCreateNestedOneWithoutBaselineInput = {
    create?: XOR<ProjectCreateWithoutBaselineInput, ProjectUncheckedCreateWithoutBaselineInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutBaselineInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutBaselineNestedInput = {
    create?: XOR<ProjectCreateWithoutBaselineInput, ProjectUncheckedCreateWithoutBaselineInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutBaselineInput
    upsert?: ProjectUpsertWithoutBaselineInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutBaselineInput, ProjectUpdateWithoutBaselineInput>, ProjectUncheckedUpdateWithoutBaselineInput>
  }

  export type ProjectCreateNestedOneWithoutCiTokenInput = {
    create?: XOR<ProjectCreateWithoutCiTokenInput, ProjectUncheckedCreateWithoutCiTokenInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutCiTokenInput
    connect?: ProjectWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ProjectUpdateOneRequiredWithoutCiTokenNestedInput = {
    create?: XOR<ProjectCreateWithoutCiTokenInput, ProjectUncheckedCreateWithoutCiTokenInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutCiTokenInput
    upsert?: ProjectUpsertWithoutCiTokenInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutCiTokenInput, ProjectUpdateWithoutCiTokenInput>, ProjectUncheckedUpdateWithoutCiTokenInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ProjectCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    model: string
    systemPrompt?: string | null
    temperature?: number | null
    topP?: number | null
    maxTokens?: number | null
    inputCostPerMillion?: number
    cachedInputCostPerMillion?: number
    outputCostPerMillion?: number
    allowedQualityDrop?: number
    cacheEnabled?: boolean
    cacheTtlSeconds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    baseline?: BaselineCreateNestedOneWithoutProjectInput
    datasets?: DatasetCreateNestedManyWithoutProjectInput
    evaluators?: EvaluatorCreateNestedManyWithoutProjectInput
    experiments?: ExperimentCreateNestedManyWithoutProjectInput
    githubIntegrations?: GithubIntegrationCreateNestedManyWithoutProjectInput
    ciToken?: ProjectCiTokenCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    model: string
    systemPrompt?: string | null
    temperature?: number | null
    topP?: number | null
    maxTokens?: number | null
    inputCostPerMillion?: number
    cachedInputCostPerMillion?: number
    outputCostPerMillion?: number
    allowedQualityDrop?: number
    cacheEnabled?: boolean
    cacheTtlSeconds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    baseline?: BaselineUncheckedCreateNestedOneWithoutProjectInput
    datasets?: DatasetUncheckedCreateNestedManyWithoutProjectInput
    evaluators?: EvaluatorUncheckedCreateNestedManyWithoutProjectInput
    experiments?: ExperimentUncheckedCreateNestedManyWithoutProjectInput
    githubIntegrations?: GithubIntegrationUncheckedCreateNestedManyWithoutProjectInput
    ciToken?: ProjectCiTokenUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutUserInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectCreateManyUserInputEnvelope = {
    data: ProjectCreateManyUserInput | ProjectCreateManyUserInput[]
  }

  export type ProjectUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
  }

  export type ProjectUpdateManyWithWhereWithoutUserInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    userId?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    model?: StringFilter<"Project"> | string
    systemPrompt?: StringNullableFilter<"Project"> | string | null
    temperature?: FloatNullableFilter<"Project"> | number | null
    topP?: FloatNullableFilter<"Project"> | number | null
    maxTokens?: IntNullableFilter<"Project"> | number | null
    inputCostPerMillion?: FloatFilter<"Project"> | number
    cachedInputCostPerMillion?: FloatFilter<"Project"> | number
    outputCostPerMillion?: FloatFilter<"Project"> | number
    allowedQualityDrop?: FloatFilter<"Project"> | number
    cacheEnabled?: BoolFilter<"Project"> | boolean
    cacheTtlSeconds?: IntFilter<"Project"> | number
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
  }

  export type BaselineCreateWithoutProjectInput = {
    id?: string
    experimentId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BaselineUncheckedCreateWithoutProjectInput = {
    id?: string
    experimentId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BaselineCreateOrConnectWithoutProjectInput = {
    where: BaselineWhereUniqueInput
    create: XOR<BaselineCreateWithoutProjectInput, BaselineUncheckedCreateWithoutProjectInput>
  }

  export type DatasetCreateWithoutProjectInput = {
    id?: string
    name: string
    description?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    experiments?: ExperimentCreateNestedManyWithoutDatasetInput
    testCases?: TestCaseCreateNestedManyWithoutDatasetInput
  }

  export type DatasetUncheckedCreateWithoutProjectInput = {
    id?: string
    name: string
    description?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    experiments?: ExperimentUncheckedCreateNestedManyWithoutDatasetInput
    testCases?: TestCaseUncheckedCreateNestedManyWithoutDatasetInput
  }

  export type DatasetCreateOrConnectWithoutProjectInput = {
    where: DatasetWhereUniqueInput
    create: XOR<DatasetCreateWithoutProjectInput, DatasetUncheckedCreateWithoutProjectInput>
  }

  export type DatasetCreateManyProjectInputEnvelope = {
    data: DatasetCreateManyProjectInput | DatasetCreateManyProjectInput[]
  }

  export type EvaluatorCreateWithoutProjectInput = {
    id?: string
    name: string
    type: string
    config: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EvaluatorUncheckedCreateWithoutProjectInput = {
    id?: string
    name: string
    type: string
    config: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EvaluatorCreateOrConnectWithoutProjectInput = {
    where: EvaluatorWhereUniqueInput
    create: XOR<EvaluatorCreateWithoutProjectInput, EvaluatorUncheckedCreateWithoutProjectInput>
  }

  export type EvaluatorCreateManyProjectInputEnvelope = {
    data: EvaluatorCreateManyProjectInput | EvaluatorCreateManyProjectInput[]
  }

  export type ExperimentCreateWithoutProjectInput = {
    id?: string
    name: string
    model: string
    status?: string
    qualityScore?: number | null
    passRate?: number | null
    avgLatencyMs?: number | null
    totalTokens?: number
    totalCostUsd?: number
    cacheHitRate?: number
    cacheMissRate?: number
    llmCallsAvoided?: number
    cachedInputTokens?: number
    estimatedCostSavedUsd?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    allowedQualityDrop?: number
    errorMessage?: string | null
    failOnRegression?: boolean
    regressionDelta?: number | null
    regressionPassed?: boolean
    useCache?: boolean
    results?: EvaluationResultCreateNestedManyWithoutExperimentInput
    dataset: DatasetCreateNestedOneWithoutExperimentsInput
  }

  export type ExperimentUncheckedCreateWithoutProjectInput = {
    id?: string
    datasetId: string
    name: string
    model: string
    status?: string
    qualityScore?: number | null
    passRate?: number | null
    avgLatencyMs?: number | null
    totalTokens?: number
    totalCostUsd?: number
    cacheHitRate?: number
    cacheMissRate?: number
    llmCallsAvoided?: number
    cachedInputTokens?: number
    estimatedCostSavedUsd?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    allowedQualityDrop?: number
    errorMessage?: string | null
    failOnRegression?: boolean
    regressionDelta?: number | null
    regressionPassed?: boolean
    useCache?: boolean
    results?: EvaluationResultUncheckedCreateNestedManyWithoutExperimentInput
  }

  export type ExperimentCreateOrConnectWithoutProjectInput = {
    where: ExperimentWhereUniqueInput
    create: XOR<ExperimentCreateWithoutProjectInput, ExperimentUncheckedCreateWithoutProjectInput>
  }

  export type ExperimentCreateManyProjectInputEnvelope = {
    data: ExperimentCreateManyProjectInput | ExperimentCreateManyProjectInput[]
  }

  export type GithubIntegrationCreateWithoutProjectInput = {
    id?: string
    repositoryName: string
    repositoryId?: string | null
    installationId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GithubIntegrationUncheckedCreateWithoutProjectInput = {
    id?: string
    repositoryName: string
    repositoryId?: string | null
    installationId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GithubIntegrationCreateOrConnectWithoutProjectInput = {
    where: GithubIntegrationWhereUniqueInput
    create: XOR<GithubIntegrationCreateWithoutProjectInput, GithubIntegrationUncheckedCreateWithoutProjectInput>
  }

  export type GithubIntegrationCreateManyProjectInputEnvelope = {
    data: GithubIntegrationCreateManyProjectInput | GithubIntegrationCreateManyProjectInput[]
  }

  export type UserCreateWithoutProjectsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type ProjectCiTokenCreateWithoutProjectInput = {
    id?: string
    tokenHash: string
    tokenPrefix: string
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type ProjectCiTokenUncheckedCreateWithoutProjectInput = {
    id?: string
    tokenHash: string
    tokenPrefix: string
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type ProjectCiTokenCreateOrConnectWithoutProjectInput = {
    where: ProjectCiTokenWhereUniqueInput
    create: XOR<ProjectCiTokenCreateWithoutProjectInput, ProjectCiTokenUncheckedCreateWithoutProjectInput>
  }

  export type BaselineUpsertWithoutProjectInput = {
    update: XOR<BaselineUpdateWithoutProjectInput, BaselineUncheckedUpdateWithoutProjectInput>
    create: XOR<BaselineCreateWithoutProjectInput, BaselineUncheckedCreateWithoutProjectInput>
    where?: BaselineWhereInput
  }

  export type BaselineUpdateToOneWithWhereWithoutProjectInput = {
    where?: BaselineWhereInput
    data: XOR<BaselineUpdateWithoutProjectInput, BaselineUncheckedUpdateWithoutProjectInput>
  }

  export type BaselineUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    experimentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BaselineUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    experimentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DatasetUpsertWithWhereUniqueWithoutProjectInput = {
    where: DatasetWhereUniqueInput
    update: XOR<DatasetUpdateWithoutProjectInput, DatasetUncheckedUpdateWithoutProjectInput>
    create: XOR<DatasetCreateWithoutProjectInput, DatasetUncheckedCreateWithoutProjectInput>
  }

  export type DatasetUpdateWithWhereUniqueWithoutProjectInput = {
    where: DatasetWhereUniqueInput
    data: XOR<DatasetUpdateWithoutProjectInput, DatasetUncheckedUpdateWithoutProjectInput>
  }

  export type DatasetUpdateManyWithWhereWithoutProjectInput = {
    where: DatasetScalarWhereInput
    data: XOR<DatasetUpdateManyMutationInput, DatasetUncheckedUpdateManyWithoutProjectInput>
  }

  export type DatasetScalarWhereInput = {
    AND?: DatasetScalarWhereInput | DatasetScalarWhereInput[]
    OR?: DatasetScalarWhereInput[]
    NOT?: DatasetScalarWhereInput | DatasetScalarWhereInput[]
    id?: StringFilter<"Dataset"> | string
    projectId?: StringFilter<"Dataset"> | string
    name?: StringFilter<"Dataset"> | string
    description?: StringNullableFilter<"Dataset"> | string | null
    version?: IntFilter<"Dataset"> | number
    createdAt?: DateTimeFilter<"Dataset"> | Date | string
    updatedAt?: DateTimeFilter<"Dataset"> | Date | string
  }

  export type EvaluatorUpsertWithWhereUniqueWithoutProjectInput = {
    where: EvaluatorWhereUniqueInput
    update: XOR<EvaluatorUpdateWithoutProjectInput, EvaluatorUncheckedUpdateWithoutProjectInput>
    create: XOR<EvaluatorCreateWithoutProjectInput, EvaluatorUncheckedCreateWithoutProjectInput>
  }

  export type EvaluatorUpdateWithWhereUniqueWithoutProjectInput = {
    where: EvaluatorWhereUniqueInput
    data: XOR<EvaluatorUpdateWithoutProjectInput, EvaluatorUncheckedUpdateWithoutProjectInput>
  }

  export type EvaluatorUpdateManyWithWhereWithoutProjectInput = {
    where: EvaluatorScalarWhereInput
    data: XOR<EvaluatorUpdateManyMutationInput, EvaluatorUncheckedUpdateManyWithoutProjectInput>
  }

  export type EvaluatorScalarWhereInput = {
    AND?: EvaluatorScalarWhereInput | EvaluatorScalarWhereInput[]
    OR?: EvaluatorScalarWhereInput[]
    NOT?: EvaluatorScalarWhereInput | EvaluatorScalarWhereInput[]
    id?: StringFilter<"Evaluator"> | string
    projectId?: StringFilter<"Evaluator"> | string
    name?: StringFilter<"Evaluator"> | string
    type?: StringFilter<"Evaluator"> | string
    config?: StringFilter<"Evaluator"> | string
    createdAt?: DateTimeFilter<"Evaluator"> | Date | string
    updatedAt?: DateTimeFilter<"Evaluator"> | Date | string
  }

  export type ExperimentUpsertWithWhereUniqueWithoutProjectInput = {
    where: ExperimentWhereUniqueInput
    update: XOR<ExperimentUpdateWithoutProjectInput, ExperimentUncheckedUpdateWithoutProjectInput>
    create: XOR<ExperimentCreateWithoutProjectInput, ExperimentUncheckedCreateWithoutProjectInput>
  }

  export type ExperimentUpdateWithWhereUniqueWithoutProjectInput = {
    where: ExperimentWhereUniqueInput
    data: XOR<ExperimentUpdateWithoutProjectInput, ExperimentUncheckedUpdateWithoutProjectInput>
  }

  export type ExperimentUpdateManyWithWhereWithoutProjectInput = {
    where: ExperimentScalarWhereInput
    data: XOR<ExperimentUpdateManyMutationInput, ExperimentUncheckedUpdateManyWithoutProjectInput>
  }

  export type ExperimentScalarWhereInput = {
    AND?: ExperimentScalarWhereInput | ExperimentScalarWhereInput[]
    OR?: ExperimentScalarWhereInput[]
    NOT?: ExperimentScalarWhereInput | ExperimentScalarWhereInput[]
    id?: StringFilter<"Experiment"> | string
    projectId?: StringFilter<"Experiment"> | string
    datasetId?: StringFilter<"Experiment"> | string
    name?: StringFilter<"Experiment"> | string
    model?: StringFilter<"Experiment"> | string
    status?: StringFilter<"Experiment"> | string
    qualityScore?: FloatNullableFilter<"Experiment"> | number | null
    passRate?: FloatNullableFilter<"Experiment"> | number | null
    avgLatencyMs?: FloatNullableFilter<"Experiment"> | number | null
    totalTokens?: IntFilter<"Experiment"> | number
    totalCostUsd?: FloatFilter<"Experiment"> | number
    cacheHitRate?: FloatFilter<"Experiment"> | number
    cacheMissRate?: FloatFilter<"Experiment"> | number
    llmCallsAvoided?: IntFilter<"Experiment"> | number
    cachedInputTokens?: IntFilter<"Experiment"> | number
    estimatedCostSavedUsd?: FloatFilter<"Experiment"> | number
    createdAt?: DateTimeFilter<"Experiment"> | Date | string
    updatedAt?: DateTimeFilter<"Experiment"> | Date | string
    allowedQualityDrop?: FloatFilter<"Experiment"> | number
    errorMessage?: StringNullableFilter<"Experiment"> | string | null
    failOnRegression?: BoolFilter<"Experiment"> | boolean
    regressionDelta?: FloatNullableFilter<"Experiment"> | number | null
    regressionPassed?: BoolFilter<"Experiment"> | boolean
    useCache?: BoolFilter<"Experiment"> | boolean
  }

  export type GithubIntegrationUpsertWithWhereUniqueWithoutProjectInput = {
    where: GithubIntegrationWhereUniqueInput
    update: XOR<GithubIntegrationUpdateWithoutProjectInput, GithubIntegrationUncheckedUpdateWithoutProjectInput>
    create: XOR<GithubIntegrationCreateWithoutProjectInput, GithubIntegrationUncheckedCreateWithoutProjectInput>
  }

  export type GithubIntegrationUpdateWithWhereUniqueWithoutProjectInput = {
    where: GithubIntegrationWhereUniqueInput
    data: XOR<GithubIntegrationUpdateWithoutProjectInput, GithubIntegrationUncheckedUpdateWithoutProjectInput>
  }

  export type GithubIntegrationUpdateManyWithWhereWithoutProjectInput = {
    where: GithubIntegrationScalarWhereInput
    data: XOR<GithubIntegrationUpdateManyMutationInput, GithubIntegrationUncheckedUpdateManyWithoutProjectInput>
  }

  export type GithubIntegrationScalarWhereInput = {
    AND?: GithubIntegrationScalarWhereInput | GithubIntegrationScalarWhereInput[]
    OR?: GithubIntegrationScalarWhereInput[]
    NOT?: GithubIntegrationScalarWhereInput | GithubIntegrationScalarWhereInput[]
    id?: StringFilter<"GithubIntegration"> | string
    projectId?: StringFilter<"GithubIntegration"> | string
    repositoryName?: StringFilter<"GithubIntegration"> | string
    repositoryId?: StringNullableFilter<"GithubIntegration"> | string | null
    installationId?: StringNullableFilter<"GithubIntegration"> | string | null
    createdAt?: DateTimeFilter<"GithubIntegration"> | Date | string
    updatedAt?: DateTimeFilter<"GithubIntegration"> | Date | string
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCiTokenUpsertWithoutProjectInput = {
    update: XOR<ProjectCiTokenUpdateWithoutProjectInput, ProjectCiTokenUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectCiTokenCreateWithoutProjectInput, ProjectCiTokenUncheckedCreateWithoutProjectInput>
    where?: ProjectCiTokenWhereInput
  }

  export type ProjectCiTokenUpdateToOneWithWhereWithoutProjectInput = {
    where?: ProjectCiTokenWhereInput
    data: XOR<ProjectCiTokenUpdateWithoutProjectInput, ProjectCiTokenUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectCiTokenUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    tokenPrefix?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProjectCiTokenUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    tokenPrefix?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProjectCreateWithoutDatasetsInput = {
    id?: string
    name: string
    description?: string | null
    model: string
    systemPrompt?: string | null
    temperature?: number | null
    topP?: number | null
    maxTokens?: number | null
    inputCostPerMillion?: number
    cachedInputCostPerMillion?: number
    outputCostPerMillion?: number
    allowedQualityDrop?: number
    cacheEnabled?: boolean
    cacheTtlSeconds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    baseline?: BaselineCreateNestedOneWithoutProjectInput
    evaluators?: EvaluatorCreateNestedManyWithoutProjectInput
    experiments?: ExperimentCreateNestedManyWithoutProjectInput
    githubIntegrations?: GithubIntegrationCreateNestedManyWithoutProjectInput
    user: UserCreateNestedOneWithoutProjectsInput
    ciToken?: ProjectCiTokenCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutDatasetsInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    model: string
    systemPrompt?: string | null
    temperature?: number | null
    topP?: number | null
    maxTokens?: number | null
    inputCostPerMillion?: number
    cachedInputCostPerMillion?: number
    outputCostPerMillion?: number
    allowedQualityDrop?: number
    cacheEnabled?: boolean
    cacheTtlSeconds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    baseline?: BaselineUncheckedCreateNestedOneWithoutProjectInput
    evaluators?: EvaluatorUncheckedCreateNestedManyWithoutProjectInput
    experiments?: ExperimentUncheckedCreateNestedManyWithoutProjectInput
    githubIntegrations?: GithubIntegrationUncheckedCreateNestedManyWithoutProjectInput
    ciToken?: ProjectCiTokenUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutDatasetsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutDatasetsInput, ProjectUncheckedCreateWithoutDatasetsInput>
  }

  export type ExperimentCreateWithoutDatasetInput = {
    id?: string
    name: string
    model: string
    status?: string
    qualityScore?: number | null
    passRate?: number | null
    avgLatencyMs?: number | null
    totalTokens?: number
    totalCostUsd?: number
    cacheHitRate?: number
    cacheMissRate?: number
    llmCallsAvoided?: number
    cachedInputTokens?: number
    estimatedCostSavedUsd?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    allowedQualityDrop?: number
    errorMessage?: string | null
    failOnRegression?: boolean
    regressionDelta?: number | null
    regressionPassed?: boolean
    useCache?: boolean
    results?: EvaluationResultCreateNestedManyWithoutExperimentInput
    project: ProjectCreateNestedOneWithoutExperimentsInput
  }

  export type ExperimentUncheckedCreateWithoutDatasetInput = {
    id?: string
    projectId: string
    name: string
    model: string
    status?: string
    qualityScore?: number | null
    passRate?: number | null
    avgLatencyMs?: number | null
    totalTokens?: number
    totalCostUsd?: number
    cacheHitRate?: number
    cacheMissRate?: number
    llmCallsAvoided?: number
    cachedInputTokens?: number
    estimatedCostSavedUsd?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    allowedQualityDrop?: number
    errorMessage?: string | null
    failOnRegression?: boolean
    regressionDelta?: number | null
    regressionPassed?: boolean
    useCache?: boolean
    results?: EvaluationResultUncheckedCreateNestedManyWithoutExperimentInput
  }

  export type ExperimentCreateOrConnectWithoutDatasetInput = {
    where: ExperimentWhereUniqueInput
    create: XOR<ExperimentCreateWithoutDatasetInput, ExperimentUncheckedCreateWithoutDatasetInput>
  }

  export type ExperimentCreateManyDatasetInputEnvelope = {
    data: ExperimentCreateManyDatasetInput | ExperimentCreateManyDatasetInput[]
  }

  export type TestCaseCreateWithoutDatasetInput = {
    id?: string
    input: string
    expectedOutput?: string | null
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    results?: EvaluationResultCreateNestedManyWithoutTestCaseInput
  }

  export type TestCaseUncheckedCreateWithoutDatasetInput = {
    id?: string
    input: string
    expectedOutput?: string | null
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    results?: EvaluationResultUncheckedCreateNestedManyWithoutTestCaseInput
  }

  export type TestCaseCreateOrConnectWithoutDatasetInput = {
    where: TestCaseWhereUniqueInput
    create: XOR<TestCaseCreateWithoutDatasetInput, TestCaseUncheckedCreateWithoutDatasetInput>
  }

  export type TestCaseCreateManyDatasetInputEnvelope = {
    data: TestCaseCreateManyDatasetInput | TestCaseCreateManyDatasetInput[]
  }

  export type ProjectUpsertWithoutDatasetsInput = {
    update: XOR<ProjectUpdateWithoutDatasetsInput, ProjectUncheckedUpdateWithoutDatasetsInput>
    create: XOR<ProjectCreateWithoutDatasetsInput, ProjectUncheckedCreateWithoutDatasetsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutDatasetsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutDatasetsInput, ProjectUncheckedUpdateWithoutDatasetsInput>
  }

  export type ProjectUpdateWithoutDatasetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    topP?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    inputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    cachedInputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    outputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    cacheEnabled?: BoolFieldUpdateOperationsInput | boolean
    cacheTtlSeconds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baseline?: BaselineUpdateOneWithoutProjectNestedInput
    evaluators?: EvaluatorUpdateManyWithoutProjectNestedInput
    experiments?: ExperimentUpdateManyWithoutProjectNestedInput
    githubIntegrations?: GithubIntegrationUpdateManyWithoutProjectNestedInput
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    ciToken?: ProjectCiTokenUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutDatasetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    topP?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    inputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    cachedInputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    outputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    cacheEnabled?: BoolFieldUpdateOperationsInput | boolean
    cacheTtlSeconds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baseline?: BaselineUncheckedUpdateOneWithoutProjectNestedInput
    evaluators?: EvaluatorUncheckedUpdateManyWithoutProjectNestedInput
    experiments?: ExperimentUncheckedUpdateManyWithoutProjectNestedInput
    githubIntegrations?: GithubIntegrationUncheckedUpdateManyWithoutProjectNestedInput
    ciToken?: ProjectCiTokenUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ExperimentUpsertWithWhereUniqueWithoutDatasetInput = {
    where: ExperimentWhereUniqueInput
    update: XOR<ExperimentUpdateWithoutDatasetInput, ExperimentUncheckedUpdateWithoutDatasetInput>
    create: XOR<ExperimentCreateWithoutDatasetInput, ExperimentUncheckedCreateWithoutDatasetInput>
  }

  export type ExperimentUpdateWithWhereUniqueWithoutDatasetInput = {
    where: ExperimentWhereUniqueInput
    data: XOR<ExperimentUpdateWithoutDatasetInput, ExperimentUncheckedUpdateWithoutDatasetInput>
  }

  export type ExperimentUpdateManyWithWhereWithoutDatasetInput = {
    where: ExperimentScalarWhereInput
    data: XOR<ExperimentUpdateManyMutationInput, ExperimentUncheckedUpdateManyWithoutDatasetInput>
  }

  export type TestCaseUpsertWithWhereUniqueWithoutDatasetInput = {
    where: TestCaseWhereUniqueInput
    update: XOR<TestCaseUpdateWithoutDatasetInput, TestCaseUncheckedUpdateWithoutDatasetInput>
    create: XOR<TestCaseCreateWithoutDatasetInput, TestCaseUncheckedCreateWithoutDatasetInput>
  }

  export type TestCaseUpdateWithWhereUniqueWithoutDatasetInput = {
    where: TestCaseWhereUniqueInput
    data: XOR<TestCaseUpdateWithoutDatasetInput, TestCaseUncheckedUpdateWithoutDatasetInput>
  }

  export type TestCaseUpdateManyWithWhereWithoutDatasetInput = {
    where: TestCaseScalarWhereInput
    data: XOR<TestCaseUpdateManyMutationInput, TestCaseUncheckedUpdateManyWithoutDatasetInput>
  }

  export type TestCaseScalarWhereInput = {
    AND?: TestCaseScalarWhereInput | TestCaseScalarWhereInput[]
    OR?: TestCaseScalarWhereInput[]
    NOT?: TestCaseScalarWhereInput | TestCaseScalarWhereInput[]
    id?: StringFilter<"TestCase"> | string
    datasetId?: StringFilter<"TestCase"> | string
    input?: StringFilter<"TestCase"> | string
    expectedOutput?: StringNullableFilter<"TestCase"> | string | null
    metadata?: StringNullableFilter<"TestCase"> | string | null
    createdAt?: DateTimeFilter<"TestCase"> | Date | string
    updatedAt?: DateTimeFilter<"TestCase"> | Date | string
  }

  export type EvaluationResultCreateWithoutTestCaseInput = {
    id?: string
    actualOutput: string
    score: number
    passed: boolean
    latencyMs?: number | null
    ttftMs?: number | null
    inputTokens?: number | null
    outputTokens?: number | null
    cacheHit?: boolean
    reason?: string | null
    createdAt?: Date | string
    cachedInputTokens?: number
    estimatedCostUsd?: number | null
    totalTokens?: number | null
    uncachedEstimatedCostUsd?: number | null
    experiment: ExperimentCreateNestedOneWithoutResultsInput
  }

  export type EvaluationResultUncheckedCreateWithoutTestCaseInput = {
    id?: string
    experimentId: string
    actualOutput: string
    score: number
    passed: boolean
    latencyMs?: number | null
    ttftMs?: number | null
    inputTokens?: number | null
    outputTokens?: number | null
    cacheHit?: boolean
    reason?: string | null
    createdAt?: Date | string
    cachedInputTokens?: number
    estimatedCostUsd?: number | null
    totalTokens?: number | null
    uncachedEstimatedCostUsd?: number | null
  }

  export type EvaluationResultCreateOrConnectWithoutTestCaseInput = {
    where: EvaluationResultWhereUniqueInput
    create: XOR<EvaluationResultCreateWithoutTestCaseInput, EvaluationResultUncheckedCreateWithoutTestCaseInput>
  }

  export type EvaluationResultCreateManyTestCaseInputEnvelope = {
    data: EvaluationResultCreateManyTestCaseInput | EvaluationResultCreateManyTestCaseInput[]
  }

  export type DatasetCreateWithoutTestCasesInput = {
    id?: string
    name: string
    description?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutDatasetsInput
    experiments?: ExperimentCreateNestedManyWithoutDatasetInput
  }

  export type DatasetUncheckedCreateWithoutTestCasesInput = {
    id?: string
    projectId: string
    name: string
    description?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    experiments?: ExperimentUncheckedCreateNestedManyWithoutDatasetInput
  }

  export type DatasetCreateOrConnectWithoutTestCasesInput = {
    where: DatasetWhereUniqueInput
    create: XOR<DatasetCreateWithoutTestCasesInput, DatasetUncheckedCreateWithoutTestCasesInput>
  }

  export type EvaluationResultUpsertWithWhereUniqueWithoutTestCaseInput = {
    where: EvaluationResultWhereUniqueInput
    update: XOR<EvaluationResultUpdateWithoutTestCaseInput, EvaluationResultUncheckedUpdateWithoutTestCaseInput>
    create: XOR<EvaluationResultCreateWithoutTestCaseInput, EvaluationResultUncheckedCreateWithoutTestCaseInput>
  }

  export type EvaluationResultUpdateWithWhereUniqueWithoutTestCaseInput = {
    where: EvaluationResultWhereUniqueInput
    data: XOR<EvaluationResultUpdateWithoutTestCaseInput, EvaluationResultUncheckedUpdateWithoutTestCaseInput>
  }

  export type EvaluationResultUpdateManyWithWhereWithoutTestCaseInput = {
    where: EvaluationResultScalarWhereInput
    data: XOR<EvaluationResultUpdateManyMutationInput, EvaluationResultUncheckedUpdateManyWithoutTestCaseInput>
  }

  export type EvaluationResultScalarWhereInput = {
    AND?: EvaluationResultScalarWhereInput | EvaluationResultScalarWhereInput[]
    OR?: EvaluationResultScalarWhereInput[]
    NOT?: EvaluationResultScalarWhereInput | EvaluationResultScalarWhereInput[]
    id?: StringFilter<"EvaluationResult"> | string
    experimentId?: StringFilter<"EvaluationResult"> | string
    testCaseId?: StringFilter<"EvaluationResult"> | string
    actualOutput?: StringFilter<"EvaluationResult"> | string
    score?: FloatFilter<"EvaluationResult"> | number
    passed?: BoolFilter<"EvaluationResult"> | boolean
    latencyMs?: IntNullableFilter<"EvaluationResult"> | number | null
    ttftMs?: IntNullableFilter<"EvaluationResult"> | number | null
    inputTokens?: IntNullableFilter<"EvaluationResult"> | number | null
    outputTokens?: IntNullableFilter<"EvaluationResult"> | number | null
    cacheHit?: BoolFilter<"EvaluationResult"> | boolean
    reason?: StringNullableFilter<"EvaluationResult"> | string | null
    createdAt?: DateTimeFilter<"EvaluationResult"> | Date | string
    cachedInputTokens?: IntFilter<"EvaluationResult"> | number
    estimatedCostUsd?: FloatNullableFilter<"EvaluationResult"> | number | null
    totalTokens?: IntNullableFilter<"EvaluationResult"> | number | null
    uncachedEstimatedCostUsd?: FloatNullableFilter<"EvaluationResult"> | number | null
  }

  export type DatasetUpsertWithoutTestCasesInput = {
    update: XOR<DatasetUpdateWithoutTestCasesInput, DatasetUncheckedUpdateWithoutTestCasesInput>
    create: XOR<DatasetCreateWithoutTestCasesInput, DatasetUncheckedCreateWithoutTestCasesInput>
    where?: DatasetWhereInput
  }

  export type DatasetUpdateToOneWithWhereWithoutTestCasesInput = {
    where?: DatasetWhereInput
    data: XOR<DatasetUpdateWithoutTestCasesInput, DatasetUncheckedUpdateWithoutTestCasesInput>
  }

  export type DatasetUpdateWithoutTestCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutDatasetsNestedInput
    experiments?: ExperimentUpdateManyWithoutDatasetNestedInput
  }

  export type DatasetUncheckedUpdateWithoutTestCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    experiments?: ExperimentUncheckedUpdateManyWithoutDatasetNestedInput
  }

  export type ProjectCreateWithoutEvaluatorsInput = {
    id?: string
    name: string
    description?: string | null
    model: string
    systemPrompt?: string | null
    temperature?: number | null
    topP?: number | null
    maxTokens?: number | null
    inputCostPerMillion?: number
    cachedInputCostPerMillion?: number
    outputCostPerMillion?: number
    allowedQualityDrop?: number
    cacheEnabled?: boolean
    cacheTtlSeconds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    baseline?: BaselineCreateNestedOneWithoutProjectInput
    datasets?: DatasetCreateNestedManyWithoutProjectInput
    experiments?: ExperimentCreateNestedManyWithoutProjectInput
    githubIntegrations?: GithubIntegrationCreateNestedManyWithoutProjectInput
    user: UserCreateNestedOneWithoutProjectsInput
    ciToken?: ProjectCiTokenCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutEvaluatorsInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    model: string
    systemPrompt?: string | null
    temperature?: number | null
    topP?: number | null
    maxTokens?: number | null
    inputCostPerMillion?: number
    cachedInputCostPerMillion?: number
    outputCostPerMillion?: number
    allowedQualityDrop?: number
    cacheEnabled?: boolean
    cacheTtlSeconds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    baseline?: BaselineUncheckedCreateNestedOneWithoutProjectInput
    datasets?: DatasetUncheckedCreateNestedManyWithoutProjectInput
    experiments?: ExperimentUncheckedCreateNestedManyWithoutProjectInput
    githubIntegrations?: GithubIntegrationUncheckedCreateNestedManyWithoutProjectInput
    ciToken?: ProjectCiTokenUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutEvaluatorsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutEvaluatorsInput, ProjectUncheckedCreateWithoutEvaluatorsInput>
  }

  export type ProjectUpsertWithoutEvaluatorsInput = {
    update: XOR<ProjectUpdateWithoutEvaluatorsInput, ProjectUncheckedUpdateWithoutEvaluatorsInput>
    create: XOR<ProjectCreateWithoutEvaluatorsInput, ProjectUncheckedCreateWithoutEvaluatorsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutEvaluatorsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutEvaluatorsInput, ProjectUncheckedUpdateWithoutEvaluatorsInput>
  }

  export type ProjectUpdateWithoutEvaluatorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    topP?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    inputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    cachedInputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    outputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    cacheEnabled?: BoolFieldUpdateOperationsInput | boolean
    cacheTtlSeconds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baseline?: BaselineUpdateOneWithoutProjectNestedInput
    datasets?: DatasetUpdateManyWithoutProjectNestedInput
    experiments?: ExperimentUpdateManyWithoutProjectNestedInput
    githubIntegrations?: GithubIntegrationUpdateManyWithoutProjectNestedInput
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    ciToken?: ProjectCiTokenUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutEvaluatorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    topP?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    inputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    cachedInputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    outputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    cacheEnabled?: BoolFieldUpdateOperationsInput | boolean
    cacheTtlSeconds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baseline?: BaselineUncheckedUpdateOneWithoutProjectNestedInput
    datasets?: DatasetUncheckedUpdateManyWithoutProjectNestedInput
    experiments?: ExperimentUncheckedUpdateManyWithoutProjectNestedInput
    githubIntegrations?: GithubIntegrationUncheckedUpdateManyWithoutProjectNestedInput
    ciToken?: ProjectCiTokenUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type EvaluationResultCreateWithoutExperimentInput = {
    id?: string
    actualOutput: string
    score: number
    passed: boolean
    latencyMs?: number | null
    ttftMs?: number | null
    inputTokens?: number | null
    outputTokens?: number | null
    cacheHit?: boolean
    reason?: string | null
    createdAt?: Date | string
    cachedInputTokens?: number
    estimatedCostUsd?: number | null
    totalTokens?: number | null
    uncachedEstimatedCostUsd?: number | null
    testCase: TestCaseCreateNestedOneWithoutResultsInput
  }

  export type EvaluationResultUncheckedCreateWithoutExperimentInput = {
    id?: string
    testCaseId: string
    actualOutput: string
    score: number
    passed: boolean
    latencyMs?: number | null
    ttftMs?: number | null
    inputTokens?: number | null
    outputTokens?: number | null
    cacheHit?: boolean
    reason?: string | null
    createdAt?: Date | string
    cachedInputTokens?: number
    estimatedCostUsd?: number | null
    totalTokens?: number | null
    uncachedEstimatedCostUsd?: number | null
  }

  export type EvaluationResultCreateOrConnectWithoutExperimentInput = {
    where: EvaluationResultWhereUniqueInput
    create: XOR<EvaluationResultCreateWithoutExperimentInput, EvaluationResultUncheckedCreateWithoutExperimentInput>
  }

  export type EvaluationResultCreateManyExperimentInputEnvelope = {
    data: EvaluationResultCreateManyExperimentInput | EvaluationResultCreateManyExperimentInput[]
  }

  export type DatasetCreateWithoutExperimentsInput = {
    id?: string
    name: string
    description?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutDatasetsInput
    testCases?: TestCaseCreateNestedManyWithoutDatasetInput
  }

  export type DatasetUncheckedCreateWithoutExperimentsInput = {
    id?: string
    projectId: string
    name: string
    description?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    testCases?: TestCaseUncheckedCreateNestedManyWithoutDatasetInput
  }

  export type DatasetCreateOrConnectWithoutExperimentsInput = {
    where: DatasetWhereUniqueInput
    create: XOR<DatasetCreateWithoutExperimentsInput, DatasetUncheckedCreateWithoutExperimentsInput>
  }

  export type ProjectCreateWithoutExperimentsInput = {
    id?: string
    name: string
    description?: string | null
    model: string
    systemPrompt?: string | null
    temperature?: number | null
    topP?: number | null
    maxTokens?: number | null
    inputCostPerMillion?: number
    cachedInputCostPerMillion?: number
    outputCostPerMillion?: number
    allowedQualityDrop?: number
    cacheEnabled?: boolean
    cacheTtlSeconds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    baseline?: BaselineCreateNestedOneWithoutProjectInput
    datasets?: DatasetCreateNestedManyWithoutProjectInput
    evaluators?: EvaluatorCreateNestedManyWithoutProjectInput
    githubIntegrations?: GithubIntegrationCreateNestedManyWithoutProjectInput
    user: UserCreateNestedOneWithoutProjectsInput
    ciToken?: ProjectCiTokenCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutExperimentsInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    model: string
    systemPrompt?: string | null
    temperature?: number | null
    topP?: number | null
    maxTokens?: number | null
    inputCostPerMillion?: number
    cachedInputCostPerMillion?: number
    outputCostPerMillion?: number
    allowedQualityDrop?: number
    cacheEnabled?: boolean
    cacheTtlSeconds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    baseline?: BaselineUncheckedCreateNestedOneWithoutProjectInput
    datasets?: DatasetUncheckedCreateNestedManyWithoutProjectInput
    evaluators?: EvaluatorUncheckedCreateNestedManyWithoutProjectInput
    githubIntegrations?: GithubIntegrationUncheckedCreateNestedManyWithoutProjectInput
    ciToken?: ProjectCiTokenUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutExperimentsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutExperimentsInput, ProjectUncheckedCreateWithoutExperimentsInput>
  }

  export type EvaluationResultUpsertWithWhereUniqueWithoutExperimentInput = {
    where: EvaluationResultWhereUniqueInput
    update: XOR<EvaluationResultUpdateWithoutExperimentInput, EvaluationResultUncheckedUpdateWithoutExperimentInput>
    create: XOR<EvaluationResultCreateWithoutExperimentInput, EvaluationResultUncheckedCreateWithoutExperimentInput>
  }

  export type EvaluationResultUpdateWithWhereUniqueWithoutExperimentInput = {
    where: EvaluationResultWhereUniqueInput
    data: XOR<EvaluationResultUpdateWithoutExperimentInput, EvaluationResultUncheckedUpdateWithoutExperimentInput>
  }

  export type EvaluationResultUpdateManyWithWhereWithoutExperimentInput = {
    where: EvaluationResultScalarWhereInput
    data: XOR<EvaluationResultUpdateManyMutationInput, EvaluationResultUncheckedUpdateManyWithoutExperimentInput>
  }

  export type DatasetUpsertWithoutExperimentsInput = {
    update: XOR<DatasetUpdateWithoutExperimentsInput, DatasetUncheckedUpdateWithoutExperimentsInput>
    create: XOR<DatasetCreateWithoutExperimentsInput, DatasetUncheckedCreateWithoutExperimentsInput>
    where?: DatasetWhereInput
  }

  export type DatasetUpdateToOneWithWhereWithoutExperimentsInput = {
    where?: DatasetWhereInput
    data: XOR<DatasetUpdateWithoutExperimentsInput, DatasetUncheckedUpdateWithoutExperimentsInput>
  }

  export type DatasetUpdateWithoutExperimentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutDatasetsNestedInput
    testCases?: TestCaseUpdateManyWithoutDatasetNestedInput
  }

  export type DatasetUncheckedUpdateWithoutExperimentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testCases?: TestCaseUncheckedUpdateManyWithoutDatasetNestedInput
  }

  export type ProjectUpsertWithoutExperimentsInput = {
    update: XOR<ProjectUpdateWithoutExperimentsInput, ProjectUncheckedUpdateWithoutExperimentsInput>
    create: XOR<ProjectCreateWithoutExperimentsInput, ProjectUncheckedCreateWithoutExperimentsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutExperimentsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutExperimentsInput, ProjectUncheckedUpdateWithoutExperimentsInput>
  }

  export type ProjectUpdateWithoutExperimentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    topP?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    inputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    cachedInputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    outputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    cacheEnabled?: BoolFieldUpdateOperationsInput | boolean
    cacheTtlSeconds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baseline?: BaselineUpdateOneWithoutProjectNestedInput
    datasets?: DatasetUpdateManyWithoutProjectNestedInput
    evaluators?: EvaluatorUpdateManyWithoutProjectNestedInput
    githubIntegrations?: GithubIntegrationUpdateManyWithoutProjectNestedInput
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    ciToken?: ProjectCiTokenUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutExperimentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    topP?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    inputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    cachedInputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    outputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    cacheEnabled?: BoolFieldUpdateOperationsInput | boolean
    cacheTtlSeconds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baseline?: BaselineUncheckedUpdateOneWithoutProjectNestedInput
    datasets?: DatasetUncheckedUpdateManyWithoutProjectNestedInput
    evaluators?: EvaluatorUncheckedUpdateManyWithoutProjectNestedInput
    githubIntegrations?: GithubIntegrationUncheckedUpdateManyWithoutProjectNestedInput
    ciToken?: ProjectCiTokenUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ExperimentCreateWithoutResultsInput = {
    id?: string
    name: string
    model: string
    status?: string
    qualityScore?: number | null
    passRate?: number | null
    avgLatencyMs?: number | null
    totalTokens?: number
    totalCostUsd?: number
    cacheHitRate?: number
    cacheMissRate?: number
    llmCallsAvoided?: number
    cachedInputTokens?: number
    estimatedCostSavedUsd?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    allowedQualityDrop?: number
    errorMessage?: string | null
    failOnRegression?: boolean
    regressionDelta?: number | null
    regressionPassed?: boolean
    useCache?: boolean
    dataset: DatasetCreateNestedOneWithoutExperimentsInput
    project: ProjectCreateNestedOneWithoutExperimentsInput
  }

  export type ExperimentUncheckedCreateWithoutResultsInput = {
    id?: string
    projectId: string
    datasetId: string
    name: string
    model: string
    status?: string
    qualityScore?: number | null
    passRate?: number | null
    avgLatencyMs?: number | null
    totalTokens?: number
    totalCostUsd?: number
    cacheHitRate?: number
    cacheMissRate?: number
    llmCallsAvoided?: number
    cachedInputTokens?: number
    estimatedCostSavedUsd?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    allowedQualityDrop?: number
    errorMessage?: string | null
    failOnRegression?: boolean
    regressionDelta?: number | null
    regressionPassed?: boolean
    useCache?: boolean
  }

  export type ExperimentCreateOrConnectWithoutResultsInput = {
    where: ExperimentWhereUniqueInput
    create: XOR<ExperimentCreateWithoutResultsInput, ExperimentUncheckedCreateWithoutResultsInput>
  }

  export type TestCaseCreateWithoutResultsInput = {
    id?: string
    input: string
    expectedOutput?: string | null
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dataset: DatasetCreateNestedOneWithoutTestCasesInput
  }

  export type TestCaseUncheckedCreateWithoutResultsInput = {
    id?: string
    datasetId: string
    input: string
    expectedOutput?: string | null
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestCaseCreateOrConnectWithoutResultsInput = {
    where: TestCaseWhereUniqueInput
    create: XOR<TestCaseCreateWithoutResultsInput, TestCaseUncheckedCreateWithoutResultsInput>
  }

  export type ExperimentUpsertWithoutResultsInput = {
    update: XOR<ExperimentUpdateWithoutResultsInput, ExperimentUncheckedUpdateWithoutResultsInput>
    create: XOR<ExperimentCreateWithoutResultsInput, ExperimentUncheckedCreateWithoutResultsInput>
    where?: ExperimentWhereInput
  }

  export type ExperimentUpdateToOneWithWhereWithoutResultsInput = {
    where?: ExperimentWhereInput
    data: XOR<ExperimentUpdateWithoutResultsInput, ExperimentUncheckedUpdateWithoutResultsInput>
  }

  export type ExperimentUpdateWithoutResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    passRate?: NullableFloatFieldUpdateOperationsInput | number | null
    avgLatencyMs?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: IntFieldUpdateOperationsInput | number
    totalCostUsd?: FloatFieldUpdateOperationsInput | number
    cacheHitRate?: FloatFieldUpdateOperationsInput | number
    cacheMissRate?: FloatFieldUpdateOperationsInput | number
    llmCallsAvoided?: IntFieldUpdateOperationsInput | number
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostSavedUsd?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failOnRegression?: BoolFieldUpdateOperationsInput | boolean
    regressionDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    regressionPassed?: BoolFieldUpdateOperationsInput | boolean
    useCache?: BoolFieldUpdateOperationsInput | boolean
    dataset?: DatasetUpdateOneRequiredWithoutExperimentsNestedInput
    project?: ProjectUpdateOneRequiredWithoutExperimentsNestedInput
  }

  export type ExperimentUncheckedUpdateWithoutResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    passRate?: NullableFloatFieldUpdateOperationsInput | number | null
    avgLatencyMs?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: IntFieldUpdateOperationsInput | number
    totalCostUsd?: FloatFieldUpdateOperationsInput | number
    cacheHitRate?: FloatFieldUpdateOperationsInput | number
    cacheMissRate?: FloatFieldUpdateOperationsInput | number
    llmCallsAvoided?: IntFieldUpdateOperationsInput | number
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostSavedUsd?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failOnRegression?: BoolFieldUpdateOperationsInput | boolean
    regressionDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    regressionPassed?: BoolFieldUpdateOperationsInput | boolean
    useCache?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TestCaseUpsertWithoutResultsInput = {
    update: XOR<TestCaseUpdateWithoutResultsInput, TestCaseUncheckedUpdateWithoutResultsInput>
    create: XOR<TestCaseCreateWithoutResultsInput, TestCaseUncheckedCreateWithoutResultsInput>
    where?: TestCaseWhereInput
  }

  export type TestCaseUpdateToOneWithWhereWithoutResultsInput = {
    where?: TestCaseWhereInput
    data: XOR<TestCaseUpdateWithoutResultsInput, TestCaseUncheckedUpdateWithoutResultsInput>
  }

  export type TestCaseUpdateWithoutResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    input?: StringFieldUpdateOperationsInput | string
    expectedOutput?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataset?: DatasetUpdateOneRequiredWithoutTestCasesNestedInput
  }

  export type TestCaseUncheckedUpdateWithoutResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    input?: StringFieldUpdateOperationsInput | string
    expectedOutput?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateWithoutGithubIntegrationsInput = {
    id?: string
    name: string
    description?: string | null
    model: string
    systemPrompt?: string | null
    temperature?: number | null
    topP?: number | null
    maxTokens?: number | null
    inputCostPerMillion?: number
    cachedInputCostPerMillion?: number
    outputCostPerMillion?: number
    allowedQualityDrop?: number
    cacheEnabled?: boolean
    cacheTtlSeconds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    baseline?: BaselineCreateNestedOneWithoutProjectInput
    datasets?: DatasetCreateNestedManyWithoutProjectInput
    evaluators?: EvaluatorCreateNestedManyWithoutProjectInput
    experiments?: ExperimentCreateNestedManyWithoutProjectInput
    user: UserCreateNestedOneWithoutProjectsInput
    ciToken?: ProjectCiTokenCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutGithubIntegrationsInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    model: string
    systemPrompt?: string | null
    temperature?: number | null
    topP?: number | null
    maxTokens?: number | null
    inputCostPerMillion?: number
    cachedInputCostPerMillion?: number
    outputCostPerMillion?: number
    allowedQualityDrop?: number
    cacheEnabled?: boolean
    cacheTtlSeconds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    baseline?: BaselineUncheckedCreateNestedOneWithoutProjectInput
    datasets?: DatasetUncheckedCreateNestedManyWithoutProjectInput
    evaluators?: EvaluatorUncheckedCreateNestedManyWithoutProjectInput
    experiments?: ExperimentUncheckedCreateNestedManyWithoutProjectInput
    ciToken?: ProjectCiTokenUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutGithubIntegrationsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutGithubIntegrationsInput, ProjectUncheckedCreateWithoutGithubIntegrationsInput>
  }

  export type ProjectUpsertWithoutGithubIntegrationsInput = {
    update: XOR<ProjectUpdateWithoutGithubIntegrationsInput, ProjectUncheckedUpdateWithoutGithubIntegrationsInput>
    create: XOR<ProjectCreateWithoutGithubIntegrationsInput, ProjectUncheckedCreateWithoutGithubIntegrationsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutGithubIntegrationsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutGithubIntegrationsInput, ProjectUncheckedUpdateWithoutGithubIntegrationsInput>
  }

  export type ProjectUpdateWithoutGithubIntegrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    topP?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    inputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    cachedInputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    outputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    cacheEnabled?: BoolFieldUpdateOperationsInput | boolean
    cacheTtlSeconds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baseline?: BaselineUpdateOneWithoutProjectNestedInput
    datasets?: DatasetUpdateManyWithoutProjectNestedInput
    evaluators?: EvaluatorUpdateManyWithoutProjectNestedInput
    experiments?: ExperimentUpdateManyWithoutProjectNestedInput
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    ciToken?: ProjectCiTokenUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutGithubIntegrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    topP?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    inputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    cachedInputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    outputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    cacheEnabled?: BoolFieldUpdateOperationsInput | boolean
    cacheTtlSeconds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baseline?: BaselineUncheckedUpdateOneWithoutProjectNestedInput
    datasets?: DatasetUncheckedUpdateManyWithoutProjectNestedInput
    evaluators?: EvaluatorUncheckedUpdateManyWithoutProjectNestedInput
    experiments?: ExperimentUncheckedUpdateManyWithoutProjectNestedInput
    ciToken?: ProjectCiTokenUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutBaselineInput = {
    id?: string
    name: string
    description?: string | null
    model: string
    systemPrompt?: string | null
    temperature?: number | null
    topP?: number | null
    maxTokens?: number | null
    inputCostPerMillion?: number
    cachedInputCostPerMillion?: number
    outputCostPerMillion?: number
    allowedQualityDrop?: number
    cacheEnabled?: boolean
    cacheTtlSeconds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    datasets?: DatasetCreateNestedManyWithoutProjectInput
    evaluators?: EvaluatorCreateNestedManyWithoutProjectInput
    experiments?: ExperimentCreateNestedManyWithoutProjectInput
    githubIntegrations?: GithubIntegrationCreateNestedManyWithoutProjectInput
    user: UserCreateNestedOneWithoutProjectsInput
    ciToken?: ProjectCiTokenCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutBaselineInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    model: string
    systemPrompt?: string | null
    temperature?: number | null
    topP?: number | null
    maxTokens?: number | null
    inputCostPerMillion?: number
    cachedInputCostPerMillion?: number
    outputCostPerMillion?: number
    allowedQualityDrop?: number
    cacheEnabled?: boolean
    cacheTtlSeconds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    datasets?: DatasetUncheckedCreateNestedManyWithoutProjectInput
    evaluators?: EvaluatorUncheckedCreateNestedManyWithoutProjectInput
    experiments?: ExperimentUncheckedCreateNestedManyWithoutProjectInput
    githubIntegrations?: GithubIntegrationUncheckedCreateNestedManyWithoutProjectInput
    ciToken?: ProjectCiTokenUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutBaselineInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutBaselineInput, ProjectUncheckedCreateWithoutBaselineInput>
  }

  export type ProjectUpsertWithoutBaselineInput = {
    update: XOR<ProjectUpdateWithoutBaselineInput, ProjectUncheckedUpdateWithoutBaselineInput>
    create: XOR<ProjectCreateWithoutBaselineInput, ProjectUncheckedCreateWithoutBaselineInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutBaselineInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutBaselineInput, ProjectUncheckedUpdateWithoutBaselineInput>
  }

  export type ProjectUpdateWithoutBaselineInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    topP?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    inputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    cachedInputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    outputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    cacheEnabled?: BoolFieldUpdateOperationsInput | boolean
    cacheTtlSeconds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    datasets?: DatasetUpdateManyWithoutProjectNestedInput
    evaluators?: EvaluatorUpdateManyWithoutProjectNestedInput
    experiments?: ExperimentUpdateManyWithoutProjectNestedInput
    githubIntegrations?: GithubIntegrationUpdateManyWithoutProjectNestedInput
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    ciToken?: ProjectCiTokenUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutBaselineInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    topP?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    inputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    cachedInputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    outputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    cacheEnabled?: BoolFieldUpdateOperationsInput | boolean
    cacheTtlSeconds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    datasets?: DatasetUncheckedUpdateManyWithoutProjectNestedInput
    evaluators?: EvaluatorUncheckedUpdateManyWithoutProjectNestedInput
    experiments?: ExperimentUncheckedUpdateManyWithoutProjectNestedInput
    githubIntegrations?: GithubIntegrationUncheckedUpdateManyWithoutProjectNestedInput
    ciToken?: ProjectCiTokenUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutCiTokenInput = {
    id?: string
    name: string
    description?: string | null
    model: string
    systemPrompt?: string | null
    temperature?: number | null
    topP?: number | null
    maxTokens?: number | null
    inputCostPerMillion?: number
    cachedInputCostPerMillion?: number
    outputCostPerMillion?: number
    allowedQualityDrop?: number
    cacheEnabled?: boolean
    cacheTtlSeconds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    baseline?: BaselineCreateNestedOneWithoutProjectInput
    datasets?: DatasetCreateNestedManyWithoutProjectInput
    evaluators?: EvaluatorCreateNestedManyWithoutProjectInput
    experiments?: ExperimentCreateNestedManyWithoutProjectInput
    githubIntegrations?: GithubIntegrationCreateNestedManyWithoutProjectInput
    user: UserCreateNestedOneWithoutProjectsInput
  }

  export type ProjectUncheckedCreateWithoutCiTokenInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    model: string
    systemPrompt?: string | null
    temperature?: number | null
    topP?: number | null
    maxTokens?: number | null
    inputCostPerMillion?: number
    cachedInputCostPerMillion?: number
    outputCostPerMillion?: number
    allowedQualityDrop?: number
    cacheEnabled?: boolean
    cacheTtlSeconds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    baseline?: BaselineUncheckedCreateNestedOneWithoutProjectInput
    datasets?: DatasetUncheckedCreateNestedManyWithoutProjectInput
    evaluators?: EvaluatorUncheckedCreateNestedManyWithoutProjectInput
    experiments?: ExperimentUncheckedCreateNestedManyWithoutProjectInput
    githubIntegrations?: GithubIntegrationUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutCiTokenInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutCiTokenInput, ProjectUncheckedCreateWithoutCiTokenInput>
  }

  export type ProjectUpsertWithoutCiTokenInput = {
    update: XOR<ProjectUpdateWithoutCiTokenInput, ProjectUncheckedUpdateWithoutCiTokenInput>
    create: XOR<ProjectCreateWithoutCiTokenInput, ProjectUncheckedCreateWithoutCiTokenInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutCiTokenInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutCiTokenInput, ProjectUncheckedUpdateWithoutCiTokenInput>
  }

  export type ProjectUpdateWithoutCiTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    topP?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    inputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    cachedInputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    outputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    cacheEnabled?: BoolFieldUpdateOperationsInput | boolean
    cacheTtlSeconds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baseline?: BaselineUpdateOneWithoutProjectNestedInput
    datasets?: DatasetUpdateManyWithoutProjectNestedInput
    evaluators?: EvaluatorUpdateManyWithoutProjectNestedInput
    experiments?: ExperimentUpdateManyWithoutProjectNestedInput
    githubIntegrations?: GithubIntegrationUpdateManyWithoutProjectNestedInput
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateWithoutCiTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    topP?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    inputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    cachedInputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    outputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    cacheEnabled?: BoolFieldUpdateOperationsInput | boolean
    cacheTtlSeconds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baseline?: BaselineUncheckedUpdateOneWithoutProjectNestedInput
    datasets?: DatasetUncheckedUpdateManyWithoutProjectNestedInput
    evaluators?: EvaluatorUncheckedUpdateManyWithoutProjectNestedInput
    experiments?: ExperimentUncheckedUpdateManyWithoutProjectNestedInput
    githubIntegrations?: GithubIntegrationUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyUserInput = {
    id?: string
    name: string
    description?: string | null
    model: string
    systemPrompt?: string | null
    temperature?: number | null
    topP?: number | null
    maxTokens?: number | null
    inputCostPerMillion?: number
    cachedInputCostPerMillion?: number
    outputCostPerMillion?: number
    allowedQualityDrop?: number
    cacheEnabled?: boolean
    cacheTtlSeconds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    topP?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    inputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    cachedInputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    outputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    cacheEnabled?: BoolFieldUpdateOperationsInput | boolean
    cacheTtlSeconds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baseline?: BaselineUpdateOneWithoutProjectNestedInput
    datasets?: DatasetUpdateManyWithoutProjectNestedInput
    evaluators?: EvaluatorUpdateManyWithoutProjectNestedInput
    experiments?: ExperimentUpdateManyWithoutProjectNestedInput
    githubIntegrations?: GithubIntegrationUpdateManyWithoutProjectNestedInput
    ciToken?: ProjectCiTokenUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    topP?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    inputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    cachedInputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    outputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    cacheEnabled?: BoolFieldUpdateOperationsInput | boolean
    cacheTtlSeconds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baseline?: BaselineUncheckedUpdateOneWithoutProjectNestedInput
    datasets?: DatasetUncheckedUpdateManyWithoutProjectNestedInput
    evaluators?: EvaluatorUncheckedUpdateManyWithoutProjectNestedInput
    experiments?: ExperimentUncheckedUpdateManyWithoutProjectNestedInput
    githubIntegrations?: GithubIntegrationUncheckedUpdateManyWithoutProjectNestedInput
    ciToken?: ProjectCiTokenUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    topP?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    inputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    cachedInputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    outputCostPerMillion?: FloatFieldUpdateOperationsInput | number
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    cacheEnabled?: BoolFieldUpdateOperationsInput | boolean
    cacheTtlSeconds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DatasetCreateManyProjectInput = {
    id?: string
    name: string
    description?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EvaluatorCreateManyProjectInput = {
    id?: string
    name: string
    type: string
    config: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExperimentCreateManyProjectInput = {
    id?: string
    datasetId: string
    name: string
    model: string
    status?: string
    qualityScore?: number | null
    passRate?: number | null
    avgLatencyMs?: number | null
    totalTokens?: number
    totalCostUsd?: number
    cacheHitRate?: number
    cacheMissRate?: number
    llmCallsAvoided?: number
    cachedInputTokens?: number
    estimatedCostSavedUsd?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    allowedQualityDrop?: number
    errorMessage?: string | null
    failOnRegression?: boolean
    regressionDelta?: number | null
    regressionPassed?: boolean
    useCache?: boolean
  }

  export type GithubIntegrationCreateManyProjectInput = {
    id?: string
    repositoryName: string
    repositoryId?: string | null
    installationId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DatasetUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    experiments?: ExperimentUpdateManyWithoutDatasetNestedInput
    testCases?: TestCaseUpdateManyWithoutDatasetNestedInput
  }

  export type DatasetUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    experiments?: ExperimentUncheckedUpdateManyWithoutDatasetNestedInput
    testCases?: TestCaseUncheckedUpdateManyWithoutDatasetNestedInput
  }

  export type DatasetUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluatorUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    config?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluatorUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    config?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluatorUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    config?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperimentUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    passRate?: NullableFloatFieldUpdateOperationsInput | number | null
    avgLatencyMs?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: IntFieldUpdateOperationsInput | number
    totalCostUsd?: FloatFieldUpdateOperationsInput | number
    cacheHitRate?: FloatFieldUpdateOperationsInput | number
    cacheMissRate?: FloatFieldUpdateOperationsInput | number
    llmCallsAvoided?: IntFieldUpdateOperationsInput | number
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostSavedUsd?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failOnRegression?: BoolFieldUpdateOperationsInput | boolean
    regressionDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    regressionPassed?: BoolFieldUpdateOperationsInput | boolean
    useCache?: BoolFieldUpdateOperationsInput | boolean
    results?: EvaluationResultUpdateManyWithoutExperimentNestedInput
    dataset?: DatasetUpdateOneRequiredWithoutExperimentsNestedInput
  }

  export type ExperimentUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    passRate?: NullableFloatFieldUpdateOperationsInput | number | null
    avgLatencyMs?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: IntFieldUpdateOperationsInput | number
    totalCostUsd?: FloatFieldUpdateOperationsInput | number
    cacheHitRate?: FloatFieldUpdateOperationsInput | number
    cacheMissRate?: FloatFieldUpdateOperationsInput | number
    llmCallsAvoided?: IntFieldUpdateOperationsInput | number
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostSavedUsd?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failOnRegression?: BoolFieldUpdateOperationsInput | boolean
    regressionDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    regressionPassed?: BoolFieldUpdateOperationsInput | boolean
    useCache?: BoolFieldUpdateOperationsInput | boolean
    results?: EvaluationResultUncheckedUpdateManyWithoutExperimentNestedInput
  }

  export type ExperimentUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    passRate?: NullableFloatFieldUpdateOperationsInput | number | null
    avgLatencyMs?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: IntFieldUpdateOperationsInput | number
    totalCostUsd?: FloatFieldUpdateOperationsInput | number
    cacheHitRate?: FloatFieldUpdateOperationsInput | number
    cacheMissRate?: FloatFieldUpdateOperationsInput | number
    llmCallsAvoided?: IntFieldUpdateOperationsInput | number
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostSavedUsd?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failOnRegression?: BoolFieldUpdateOperationsInput | boolean
    regressionDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    regressionPassed?: BoolFieldUpdateOperationsInput | boolean
    useCache?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GithubIntegrationUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    repositoryName?: StringFieldUpdateOperationsInput | string
    repositoryId?: NullableStringFieldUpdateOperationsInput | string | null
    installationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GithubIntegrationUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    repositoryName?: StringFieldUpdateOperationsInput | string
    repositoryId?: NullableStringFieldUpdateOperationsInput | string | null
    installationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GithubIntegrationUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    repositoryName?: StringFieldUpdateOperationsInput | string
    repositoryId?: NullableStringFieldUpdateOperationsInput | string | null
    installationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperimentCreateManyDatasetInput = {
    id?: string
    projectId: string
    name: string
    model: string
    status?: string
    qualityScore?: number | null
    passRate?: number | null
    avgLatencyMs?: number | null
    totalTokens?: number
    totalCostUsd?: number
    cacheHitRate?: number
    cacheMissRate?: number
    llmCallsAvoided?: number
    cachedInputTokens?: number
    estimatedCostSavedUsd?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    allowedQualityDrop?: number
    errorMessage?: string | null
    failOnRegression?: boolean
    regressionDelta?: number | null
    regressionPassed?: boolean
    useCache?: boolean
  }

  export type TestCaseCreateManyDatasetInput = {
    id?: string
    input: string
    expectedOutput?: string | null
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExperimentUpdateWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    passRate?: NullableFloatFieldUpdateOperationsInput | number | null
    avgLatencyMs?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: IntFieldUpdateOperationsInput | number
    totalCostUsd?: FloatFieldUpdateOperationsInput | number
    cacheHitRate?: FloatFieldUpdateOperationsInput | number
    cacheMissRate?: FloatFieldUpdateOperationsInput | number
    llmCallsAvoided?: IntFieldUpdateOperationsInput | number
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostSavedUsd?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failOnRegression?: BoolFieldUpdateOperationsInput | boolean
    regressionDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    regressionPassed?: BoolFieldUpdateOperationsInput | boolean
    useCache?: BoolFieldUpdateOperationsInput | boolean
    results?: EvaluationResultUpdateManyWithoutExperimentNestedInput
    project?: ProjectUpdateOneRequiredWithoutExperimentsNestedInput
  }

  export type ExperimentUncheckedUpdateWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    passRate?: NullableFloatFieldUpdateOperationsInput | number | null
    avgLatencyMs?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: IntFieldUpdateOperationsInput | number
    totalCostUsd?: FloatFieldUpdateOperationsInput | number
    cacheHitRate?: FloatFieldUpdateOperationsInput | number
    cacheMissRate?: FloatFieldUpdateOperationsInput | number
    llmCallsAvoided?: IntFieldUpdateOperationsInput | number
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostSavedUsd?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failOnRegression?: BoolFieldUpdateOperationsInput | boolean
    regressionDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    regressionPassed?: BoolFieldUpdateOperationsInput | boolean
    useCache?: BoolFieldUpdateOperationsInput | boolean
    results?: EvaluationResultUncheckedUpdateManyWithoutExperimentNestedInput
  }

  export type ExperimentUncheckedUpdateManyWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    passRate?: NullableFloatFieldUpdateOperationsInput | number | null
    avgLatencyMs?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: IntFieldUpdateOperationsInput | number
    totalCostUsd?: FloatFieldUpdateOperationsInput | number
    cacheHitRate?: FloatFieldUpdateOperationsInput | number
    cacheMissRate?: FloatFieldUpdateOperationsInput | number
    llmCallsAvoided?: IntFieldUpdateOperationsInput | number
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostSavedUsd?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowedQualityDrop?: FloatFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failOnRegression?: BoolFieldUpdateOperationsInput | boolean
    regressionDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    regressionPassed?: BoolFieldUpdateOperationsInput | boolean
    useCache?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TestCaseUpdateWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    input?: StringFieldUpdateOperationsInput | string
    expectedOutput?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    results?: EvaluationResultUpdateManyWithoutTestCaseNestedInput
  }

  export type TestCaseUncheckedUpdateWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    input?: StringFieldUpdateOperationsInput | string
    expectedOutput?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    results?: EvaluationResultUncheckedUpdateManyWithoutTestCaseNestedInput
  }

  export type TestCaseUncheckedUpdateManyWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    input?: StringFieldUpdateOperationsInput | string
    expectedOutput?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluationResultCreateManyTestCaseInput = {
    id?: string
    experimentId: string
    actualOutput: string
    score: number
    passed: boolean
    latencyMs?: number | null
    ttftMs?: number | null
    inputTokens?: number | null
    outputTokens?: number | null
    cacheHit?: boolean
    reason?: string | null
    createdAt?: Date | string
    cachedInputTokens?: number
    estimatedCostUsd?: number | null
    totalTokens?: number | null
    uncachedEstimatedCostUsd?: number | null
  }

  export type EvaluationResultUpdateWithoutTestCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    actualOutput?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    passed?: BoolFieldUpdateOperationsInput | boolean
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    ttftMs?: NullableIntFieldUpdateOperationsInput | number | null
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cacheHit?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    uncachedEstimatedCostUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    experiment?: ExperimentUpdateOneRequiredWithoutResultsNestedInput
  }

  export type EvaluationResultUncheckedUpdateWithoutTestCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    experimentId?: StringFieldUpdateOperationsInput | string
    actualOutput?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    passed?: BoolFieldUpdateOperationsInput | boolean
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    ttftMs?: NullableIntFieldUpdateOperationsInput | number | null
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cacheHit?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    uncachedEstimatedCostUsd?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type EvaluationResultUncheckedUpdateManyWithoutTestCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    experimentId?: StringFieldUpdateOperationsInput | string
    actualOutput?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    passed?: BoolFieldUpdateOperationsInput | boolean
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    ttftMs?: NullableIntFieldUpdateOperationsInput | number | null
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cacheHit?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    uncachedEstimatedCostUsd?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type EvaluationResultCreateManyExperimentInput = {
    id?: string
    testCaseId: string
    actualOutput: string
    score: number
    passed: boolean
    latencyMs?: number | null
    ttftMs?: number | null
    inputTokens?: number | null
    outputTokens?: number | null
    cacheHit?: boolean
    reason?: string | null
    createdAt?: Date | string
    cachedInputTokens?: number
    estimatedCostUsd?: number | null
    totalTokens?: number | null
    uncachedEstimatedCostUsd?: number | null
  }

  export type EvaluationResultUpdateWithoutExperimentInput = {
    id?: StringFieldUpdateOperationsInput | string
    actualOutput?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    passed?: BoolFieldUpdateOperationsInput | boolean
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    ttftMs?: NullableIntFieldUpdateOperationsInput | number | null
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cacheHit?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    uncachedEstimatedCostUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    testCase?: TestCaseUpdateOneRequiredWithoutResultsNestedInput
  }

  export type EvaluationResultUncheckedUpdateWithoutExperimentInput = {
    id?: StringFieldUpdateOperationsInput | string
    testCaseId?: StringFieldUpdateOperationsInput | string
    actualOutput?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    passed?: BoolFieldUpdateOperationsInput | boolean
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    ttftMs?: NullableIntFieldUpdateOperationsInput | number | null
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cacheHit?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    uncachedEstimatedCostUsd?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type EvaluationResultUncheckedUpdateManyWithoutExperimentInput = {
    id?: StringFieldUpdateOperationsInput | string
    testCaseId?: StringFieldUpdateOperationsInput | string
    actualOutput?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    passed?: BoolFieldUpdateOperationsInput | boolean
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    ttftMs?: NullableIntFieldUpdateOperationsInput | number | null
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cacheHit?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cachedInputTokens?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    uncachedEstimatedCostUsd?: NullableFloatFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}