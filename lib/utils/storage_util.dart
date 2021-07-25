import 'package:get_storage/get_storage.dart';

class StorageUtil {
  static final JWT = "JWT";

  final _box = GetStorage();

  Future<dynamic> save(key, value) async => await _box.write(key, value);

  Future<dynamic> read(key) async => await _box.read(key);

  remove(key) => _box.remove(key);
}
