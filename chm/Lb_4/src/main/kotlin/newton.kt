import kotlin.math.cos
import kotlin.math.sin
import kotlin.math.abs

const val EPSILON = 1e-5
const val MAX_ITERATIONS = 100

fun main() {
    var x1 = 0.0
    var x2 = 0.0

    var iter = 0
    var dx1: Double
    var dx2: Double

    do {
        val f1 = cos(x1) + x2 - 1.2
        val f2 = 2 * x1 - sin(x2 - 0.5) - 2

        val jacobian11 = -sin(x1)
        val jacobian12 = 1.0
        val jacobian21 = 2.0
        val jacobian22 = -cos(x2 - 0.5)

        val determinant = jacobian11 * jacobian22 - jacobian12 * jacobian21

        dx1 = (jacobian22 * f1 - jacobian12 * f2) / determinant
        dx2 = (-jacobian21 * f1 + jacobian11 * f2) / determinant

        x1 -= dx1
        x2 -= dx2

        println("Iteration $iter:")
        println("x1 = %.5f, x2 = %.5f".format(x1, x2))
        println("f1 = %.5f, f2 = %.5f".format(f1, f2))

        iter++
    } while ((abs(dx1) > EPSILON || abs(dx2) > EPSILON) && iter < MAX_ITERATIONS)

    println("Final result:")
    println("x1 = %.5f, x2 = %.5f".format(x1, x2))
    println("Number of iterations: $iter")
}
