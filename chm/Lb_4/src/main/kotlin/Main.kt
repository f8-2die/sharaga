import kotlin.math.cos
import kotlin.math.sin
import kotlin.math.abs

const val eps = 1e-5
const val maxIterations = 1000

fun phi1(x: Double): Double {
    return 1.2 - cos(x)
}

fun phi2(y: Double): Double {
    return (2 + sin(y - 0.5)) / 2
}

fun solveByFixedPointIteration(): Pair<Double, Double>? {
    var x = 0.0
    var y = 0.0
    var newX = 0.0
    var newY = 0.0
    var iterations = 0

    while (iterations < maxIterations) {
        newX = phi1(y)
        newY = phi2(x)

        if (abs(newX - x) < eps && abs(newY - y) < eps) {
            return Pair(newX, newY)
        }

        x = newX
        y = newY
        iterations++
        println("Number of iterations: ${iterations}")
    }

    return null

}

fun main() {
    val solution = solveByFixedPointIteration()

    if (solution != null) {
        println("Solution:")
        println("x1 = %.5f".format(solution.first))
        println("x2 = %.5f".format(solution.second))
    } else {
        println("No solution found within the maximum number of iterations.")
    }

}
