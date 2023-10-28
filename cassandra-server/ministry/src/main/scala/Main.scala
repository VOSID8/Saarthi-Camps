import org.apache.log4j.Logger
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types._
import org.apache.spark.sql.streaming.Trigger
import org.apache.spark.sql.streaming.StreamingQuery
import org.apache.spark.sql.streaming.StreamingQueryListener
import org.apache.spark.sql.streaming.StreamingQueryListener.QueryProgressEvent
import org.apache.spark.sql.streaming.StreamingQueryListener.QueryStartedEvent
import org.apache.log4j.Level


object main extends App {
  @transient lazy val logger: Logger = Logger.getLogger(getClass.getName)

  // System.setProperty("log4j.configuration", "C:/Projects/Saarthi-Camps/cassandra-server/ministry/log4j.properties")

  // org.apache.log4j.Logger.getLogger("org.apache.kafka.clients.consumer.Consumer")
  // .setLevel(Level.ERROR)

  val spark = SparkSession.builder()
      .master("local[3]")
      .appName("enrichment")
      .config("spark.streaming.stopGracefullyOnShutdown", "true")
      .config("spark.sql.shuffle.partitions", 2)
      .config("spark.cassandra.connection.host", "localhost")
      .config("spark.cassandra.connection.port", "9042")
      .config("spark.sql.extensions", "com.datastax.spark.connector.CassandraSparkExtensions")
      .config("spark.sql.catalog.lh", "com.datastax.spark.connector.datasource.CassandraCatalog")
      .getOrCreate()

  spark.sparkContext.setLogLevel("ERROR")
  import spark.implicits._
  
  val kafkaStreamDF = spark
    .readStream
    .format("kafka")
    .option("kafka.bootstrap.servers", "localhost:9092")
    .option("subscribe", "CampInfo")
    .load()

  val schema = StructType(Seq(
    StructField("id", StringType, nullable = false),
    StructField("Medicines", MapType(StringType, IntegerType), nullable = false),
    StructField("Urgency", IntegerType, nullable = false)
  ))
  val jsonStreamDF = kafkaStreamDF
    .selectExpr("CAST(value AS STRING)")
    .select(from_json($"value", schema).as("data"))
    .select("data.*")
  val aggDF = jsonStreamDF
    .groupBy($"id")
    .agg(
      map_concat(collect_list($"Medicines"), lit(" ")).as("MergedMedicines"),
      max($"Urgency").as("MaxUrgency")
    )

  val invoiceWriterQuery = aggDF.writeStream
    .outputMode("append")
    .foreachBatch((batchDF: org.apache.spark.sql.DataFrame, batchId: Long) => {
      //val df = spark.createDataFrame(spark.sparkContext.parallelize(rows), schema)
      
      val stationsDB = spark.read
        .format("org.apache.spark.sql.cassandra")
        .option("keyspace", "camp_db")
        .option("table", "stations")
        .load()

      val aggDF = batchDF.select()

      
      //batchDF.show()
      // batchDF.write
      //   .format("org.apache.spark.sql.cassandra")
      //   .options(Map("keyspace" -> "camp_db", "table" -> "stations")) 
      //   .mode("append")
      //   .save()


    })
    .trigger(Trigger.ProcessingTime("1 minute"))
    .start()
  
  logger.info("Listening to Kafka")
  invoiceWriterQuery.awaitTermination()


}

