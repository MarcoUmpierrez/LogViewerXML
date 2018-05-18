import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    model: [
        {level:"ERROR", date: "22-12-2018", thread: 5, logger: "myapp.myclient.myclass", method: "sign-up", message: "this is an example of a short text"},
        {level:"DEBUG", date: "22-12-2018", thread: 2, logger: "myapp.myclient.myclass", method: "sign-up", message: "this is an example of a larger text that can contain a lot of words without any specific meaning, just some random things to say with the purporse of filling this"},
        {level:"INFO", date: "22-12-2018", thread: 3, logger: "myapp.myclient.myclass", method: "sign-up", message: "# Time Memory Function Location 1 0.0031 243696 {main}( ) ..\newsview.php:0 2 0.0045 246392 include( C:\wamp\www\online docter prj\database\connection.php ) ..\newsview.php:71 3 0.0045 246696 mysql_connect ( ) ..\connection.php:3"
    },
    ],
});
