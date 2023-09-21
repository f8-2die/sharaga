import org.w3c.dom.Element
import org.w3c.dom.Node
import org.w3c.dom.NodeList
import java.io.File
import javax.xml.parsers.DocumentBuilderFactory
import javax.xml.transform.TransformerFactory
import javax.xml.transform.dom.DOMSource
import javax.xml.transform.stream.StreamResult

fun main() {
    val inputXmlFile = File("group.xml") //файл на входе
    val outputXmlFile = File("output.xml")  // файл на выходе
    val doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(inputXmlFile) //считываем XML файл
    doc.documentElement.normalize()

    val studentList = doc.getElementsByTagName("student")
    for (i in 0 until studentList.length) {
        val studentNode = studentList.item(i)
        if (studentNode.nodeType == Node.ELEMENT_NODE) { //проверяет, что  является элементом XML
            val studentElement = studentNode as Element // приводим к типу элемент
            val firstname = studentElement.getAttribute("firstname")
            val lastname = studentElement.getAttribute("lastname")
            val groupnumber = studentElement.getAttribute("groupnumber")
            val subjectList = studentElement.getElementsByTagName("subject")
            var average = 0.0
            for (j in 0 until subjectList.length) {
                val subjectNode = subjectList.item(j)
                if (subjectNode.nodeType == Node.ELEMENT_NODE) {
                    val subjectElement = subjectNode as Element
                    val title = subjectElement.getAttribute("title")
                    val mark = subjectElement.getAttribute("mark").toDouble()
                    println("$firstname $lastname ($groupnumber): $title - $mark")
                    average += mark
                }
            }
            average /= subjectList.length //вычисляем среднюю оценку
            val averageNodeList = studentElement.getElementsByTagName("average")
            if (averageNodeList.length > 0) {
                val averageNode = averageNodeList.item(0)
                if (averageNode.nodeType == Node.ELEMENT_NODE) {
                    val averageElement = averageNode as Element
                    val averageValue = averageElement.textContent.toDouble()
                    if (average != averageValue) {
                        println("Warning: Average value in XML file ($averageValue) does not match calculated average ($average)")
                    }
                }
            } else {
                println("Warning: No average value found in XML file")
            }
            println("$firstname $lastname ($groupnumber): Average - $average")
            // создаем новый элемент average и добавляем его в элемент student
            val newAverageElement = doc.createElement("average")
            newAverageElement.textContent = average.toString()
            studentElement.appendChild(newAverageElement)
        }
    }
    //преобразуем исходный XML документ и записываем его в выходной файл
    val transformer = TransformerFactory.newInstance().newTransformer()
    transformer.transform(DOMSource(doc), StreamResult(outputXmlFile))
}