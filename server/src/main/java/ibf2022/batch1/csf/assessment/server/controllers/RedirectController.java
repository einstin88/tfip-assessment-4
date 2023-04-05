package ibf2022.batch1.csf.assessment.server.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/*
 * Purely to allow direct access to the Angular components via Angular router
 */
@Controller
public class RedirectController {
    @GetMapping(path = {"/view0", "/view1", "/view2/**"})
    public String redirectToAngular() {
        return "forward:/";
    }
}
