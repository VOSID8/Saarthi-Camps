lazy val root = project
  .in(file("."))
  .settings(
    name         := "DataV",
    organization := "visionofsid",
    scalaVersion := "2.12.12",
    version      := "0.1.0-SNAPSHOT",
    // libraryDependencies += "org.apache.flink" % "flink-clients" % "1.16.0",
    // libraryDependencies += "org.apache.flink" %% "flink-streaming-scala" % "1.16.0",
    // libraryDependencies += "org.apache.flink" % "flink-connector-kafka" % "1.16.0",
    // libraryDependencies += "org.apache.flink" %% "flink-table-api-scala-bridge" % "1.16.0" % "provided",
    libraryDependencies += "org.apache.spark" %% "spark-core" % "3.0.0",
    libraryDependencies += "org.apache.spark" %% "spark-sql" % "3.0.0",
    libraryDependencies += "com.datastax.spark" %% "spark-cassandra-connector" % "3.0.0",
    libraryDependencies += "com.datastax.spark" %% "spark-cassandra-connector-driver" % "3.0.0",
    libraryDependencies += "com.datastax.cassandra" % "cassandra-driver-core" % "2.1.5",
    //libraryDependencies += "org.apache.cassandra" % "cassandra-all" % "3.11.11",
    libraryDependencies += "joda-time" % "joda-time" % "2.10.2",
    libraryDependencies += "org.apache.spark" %% "spark-sql-kafka-0-10" % "3.0.0",
    libraryDependencies += "com.github.jnr" % "jnr-posix" % "3.1.15"
  )