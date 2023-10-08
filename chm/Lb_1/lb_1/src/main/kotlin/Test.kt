//import java.lang.Math.sqrt
//
////import java.util.* // импортируем класс Scanner из пакета java.util
////
////fun main() {
////    val scanner = Scanner(System.`in`)              // создаем объект класса Scanner для чтения ввода пользователя
////    print("Введите количество уравнений: ")         // выводим приглашение для ввода количества уравнений
////    val n = scanner.nextInt()                       // считываем количество уравнений
////    val A = Array(n) { DoubleArray(n) }             // создаем двумерный массив A размером n x n для хранения коэффициентов уравнений
////    val B = DoubleArray(n)                          // создаем одномерный массив B размером n для хранения свободных членов уравнений
////    println("Введите коэффициенты уравнений:")      // выводим приглашение для ввода коэффициентов уравнений
////    for (i in 0 until n) {                    // цикл для считывания коэффициентов уравнений
////        for (j in 0 until n) {
////            A[i][j] = scanner.nextDouble()          // считываем коэффициенты уравнений и сохраняем их в массив A
////        }
////        B[i] = scanner.nextDouble()                 // считываем свободные члены уравнений и сохраняем их в массив B
////    }
////
////    // цикл для приведения матрицы коэффициентов к треугольному виду
////    for (i in 0 until n) {
////        var maxEl = Math.abs(A[i][i]) // находим максимальный элемент в i-ой строке
////        var maxRow = i // запоминаем номер строки с максимальным элементом
////        for (k in i + 1 until n) { // цикл для поиска максимального элемента в столбце i
////            if (Math.abs(A[k][i]) > maxEl) { // если нашли элемент, который больше максимального, то запоминаем его и номер строки
////                maxEl = Math.abs(A[k][i])
////                maxRow = k
////            }
////        }
////        // вытаскиваем строку с максимальным элементом наверх
////        for (k in i until n) {
////            val tmp = A[maxRow][k]
////            A[maxRow][k] = A[i][k]
////            A[i][k] = tmp
////        }
////        val tmp = B[maxRow] // так же со свободным
////        B[maxRow] = B[i]
////        B[i] = tmp
////        for (k in i + 1 until n) { // приводим матрицу к треугольному виду
////            val c = -A[k][i] / A[i][i] // коэффициент, чтобы занулить элементы под главной диагональю
////            for (j in i until n) {
////                if (i == j) {
////                    A[k][j] = 0.0
////                } else {
////                    A[k][j] += c * A[i][j]
////                }
////            }
////            B[k] += c * B[i]
////        }
////    }
////    val x = DoubleArray(n) // создаем одномерный массив для хранения решений уравнений
////    for (i in n - 1 downTo 0) { // цикл для нахождения решений уравнений
////        var sum = 0.0
////        for (j in i + 1 until n) {
////            sum += A[i][j] * x[j]
////        }
////        x[i] = (B[i] - sum) / A[i][i]
////    }
////    println("Решение системы уравнений:") // выводим результаты решения системы уравнений
////    for (i in 0 until n) {
////        println("x${i + 1} = ${x[i]}") // выводим решения уравнений
////    }
////}
//fun main() {
//    val A = arrayOf(
//        doubleArrayOf(4.0, 12.0, -16.0),
//        doubleArrayOf(12.0, 37.0, -43.0),
//        doubleArrayOf(-16.0, -43.0, 98.0)
//    )
//    val B = doubleArrayOf(1.0, 2.0, 3.0)
//
//    val solution = cholesky(A, B)
//    println("Решение системы:")
//    for (i in solution.indices) {
//        println("x[${i + 1}] = ${solution[i]}")
//    }
//}
//
//fun cholesky(A: Array<DoubleArray>, B: DoubleArray): DoubleArray {
//    val n = B.size
//    val L = Array(n) { DoubleArray(n) }
//    val y = DoubleArray(n)
//    val x = DoubleArray(n)
//
//    for (i in 0 until n) {
//        for (j in 0 until (i + 1)) {
//            var sum = 0.0
//            for (k in 0 until j) {
//                sum += L[i][k] * L[j][k]
//            }
//            if (i == j) {
//                L[i][j] = sqrt(A[i][i] - sum)
//            } else {
//                L[i][j] = (1.0 / L[j][j] * (A[i][j] - sum))
//            }
//        }
//    }
//
//    for (i in 0 until n) {
//        var sum = 0.0
//        for (j in 0 until i) {
//            sum += L[i][j] * y[j]
//        }
//        y[i] = (B[i] - sum) / L[i][i]
//    }
//
//    for (i in n - 1 downTo 0) {
//        var sum = 0.0
//        for (j in i + 1 until n) {
//            sum += L[j][i] * x[j]
//        }
//        x[i] = (y[i] - sum) / L[i][i]
//    }
//
//    return x
//}
