import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Random;

@WebServlet(urlPatterns = {"/hello.png"})
public class ImageServlet extends HttpServlet {

    private static final String IMAGE_CONTENT_TYPE = "image/png";
    private static final int WIDTH = 640;
    private static final int HEIGHT = 120;
    private static final String TEXT = "Hello, World!";
    private static final String FONT_NAME = "Arial";
    private static final int FONT_SIZE = 72;
    private static final int X = 100;
    private static final int Y = 100;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        response.setContentType(IMAGE_CONTENT_TYPE);

        try (ServletOutputStream out = response.getOutputStream()) {
            BufferedImage image = new BufferedImage(WIDTH, HEIGHT, BufferedImage.TYPE_INT_RGB);

            Graphics graphics = image.getGraphics();
            graphics.setFont(new Font(FONT_NAME, Font.BOLD, FONT_SIZE));
            Random random = new Random();
            graphics.setColor(new Color(random.nextInt(256), random.nextInt(256), random.nextInt(256)));

            graphics.drawString(TEXT, X, Y);
            ImageIO.write(image, "png", out);
        }
    }
    public void doPost(HttpServletRequest request, HttpServletResponse response){
    }
}