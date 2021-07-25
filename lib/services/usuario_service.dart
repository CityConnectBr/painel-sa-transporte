
import 'package:web_sa_transportes/models/usuario_model.dart';
import 'package:web_sa_transportes/services/main_service.dart';

class UsuarioService extends MainService {
  Future<Usuario?> getUser() async {
    if ((await super.getToken()) != null) {
      try {
        return Usuario.fromJson((await dio.get('/api/user')).data);
      } catch (e) {
        print(e);
      }
    }
  }

}
