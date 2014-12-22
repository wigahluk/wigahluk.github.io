Implicit read and write objects for JSON in Play 2.3
====================================================

Last week I was trying to have a prototype working in Scala/Play 2.3 framework. All was quite nice and my first steps on
Scala were not so difficult until I tried to use the [JSON Macro Inception](https://www.playframework.com/documentation/2.3.x/ScalaJsonInception)
functionality.

The documentation was clear enough for the simple examples they had, but I was unable to make it work on my code. My example is not complicated
either:

    case class TimeSeriesData (Response: Response)
    case class Response(TimeUnit: List[Long], stats: Stats)
    case class Stats(data: List[Data])
    case class Data(identifier: Identifier, metric: List[Metric])
    case class Identifier(names: List[String], values: List[String])
    case class Metric(env: String, name: String, values: List[Double])
    
but I was getting an error all the time:

    play.PlayExceptions$CompilationException: Compilation error[No implicit Reads for assets.{some_class} available.]

After looking into a lot of places and trying all kind of superstitious ideas (as often I start having after some time of 
dealing with errors I don't quite understand) I finally realized that the problem was the order in which you declare your implicit objects.

**Every implicit object declared should not be used in any previous declaration but can be used in any further one.**

    implicit val metricReads = Json.reads[Metric]
    implicit val identifierReads = Json.reads[Identifier]
    implicit val dataReads = Json.reads[Data]
    implicit val statsReads = Json.reads[Stats]
    implicit val responseReads = Json.reads[Response]
    implicit val timeSeriesDataReads = Json.reads[TimeSeriesData]

And that's all! The implicit objects with the JSON Macro Inception works awesomely!