import "reflect-metadata";
import { buildSchema, Field, ObjectType, Resolver, Query } from "../../build/package";

import { runBenchmark } from "./run";

@ObjectType()
class SampleObject {
  @Field()
  sampleField!: string;

  @Field()
  nestedField?: SampleObject;
}

@Resolver()
class SampleResolver {
  @Query()
  singleObject(): SampleObject {
    return { sampleField: "sampleField" };
  }

  @Query()
  nestedObject(): SampleObject {
    return {
      sampleField: "sampleField",
      nestedField: {
        sampleField: "sampleField",
        nestedField: {
          sampleField: "sampleField",
          nestedField: {
            sampleField: "sampleField",
            nestedField: {
              sampleField: "sampleField",
            },
          },
        },
      },
    };
  }
}

async function main() {
  const schema = await buildSchema({
    resolvers: [SampleResolver],
  });

  await runBenchmark(schema);
}

main().catch(console.error);
