import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:web_sa_transportes/utils/storage_util.dart';
import 'package:web_sa_transportes/utils/validators.dart';

class MainService {
  final dio = Dio();
  final simpleDio = Dio();
  final storage = StorageUtil();

  String url = "";

  MainService() {
    this.url = dotenv.env['URL_API'] ?? "";
    dio.options.baseUrl = dotenv.env['URL_API'] ?? "";
    simpleDio.options.baseUrl = dotenv.env['URL_API'] ?? "";

    dio.interceptors.add(InterceptorsWrapper(
      onRequest: (request, handler) async {
        final token = await getToken();
        if (token != null && token.isNotEmpty) {
          request.headers['Authorization'] = "Bearer " + token;
          request.headers['Content-Type'] = "application/json";
        }
        return handler.next(request);
      },
      onError: (error, handler) async {
        if (error.response?.statusCode == 401) {
          final options = error.response!.requestOptions;
          // Lock to block the incoming request until the token updated
          dio.lock();
          dio.interceptors.responseLock.lock();
          dio.interceptors.errorLock.lock();
          final request = await simpleDio.get("/auth/refresh", options: Options(headers: options.headers));
          if (new RegExp(ValidatorsUtil.jwtPattern).hasMatch(request.data['newToken'])) {
            setToken(request.data['newToken']);
            options.headers['Authorization'] = "Bearer " + request.data['newToken'];
          }
          dio.unlock();
          dio.interceptors.responseLock.unlock();
          dio.interceptors.errorLock.unlock();
          /*simpleDio
              .get("/auth/refresh", options: Options(headers: options.headers))
              .then((request) => {
                    if (new RegExp(ValidatorsUtil.jwtPattern).hasMatch(request.data['newToken']))
                      {
                        setToken(request.data['newToken']),
                        options.headers['Authorization'] = "Bearer " + request.data['newToken']
                      }
                  })
              .whenComplete(() => {
                    dio.unlock(),
                    dio.interceptors.responseLock.unlock(),
                    dio.interceptors.errorLock.unlock(),
                  })
              .then((_) => {
                    dio.request(options.path, options: Options(headers: options.headers)),
                  });*/

          return handler.next(error);
        }
      },
    ));

    /*dio.interceptors.add(InterceptorsWrapper(onRequest: (RequestOptions options) async {
      final token = await getToken();
      if (token != null && token.isNotEmpty) {
        options.headers['Authorization'] = "Bearer " + token;
        options.headers['Content-Type'] = "application/json";
      }
      return options;
    }, onError: (DioError error) {
      // Assume 401 stands for token expired
      if (error.response?.statusCode == 401) {
        RequestOptions options = error.response.request;
        // Lock to block the incoming request until the token updated
        dio.lock();
        dio.interceptors.responseLock.lock();
        dio.interceptors.errorLock.lock();
        return simpleDio.get("/v1/auth/refresh", options: options).then((d) async {
          print("refresh token");
          print(d.data['newToken']);
          //update token
          if (new RegExp(ValidatorsUtil.jwtPattern).hasMatch(d.data['newToken'])) {
            setToken(d.data['newToken']);
            options.headers['Authorization'] = "Bearer " + d.data['newToken'];
          }
        }).whenComplete(() {
          dio.unlock();
          dio.interceptors.responseLock.unlock();
          dio.interceptors.errorLock.unlock();
        }).then((e) {
          //repeat request
          return dio.request(options.path, options: options);
        });
      }
      //print(error);
      return error;
    }));

    simpleDio.interceptors.add(InterceptorsWrapper(onRequest: (RequestOptions options) async {
      options.headers['Content-Type'] = "application/json";
      return options;
    }));*/
  }

  @protected
  Future<String> getToken() async {
    return await this.storage.read(StorageUtil.JWT);
  }

  @protected
  Future<Null> setToken(String token) async {
    await this.storage.save(StorageUtil.JWT, token);
  }

  @protected
  Future<Null> clearToken() async {
    this.storage.remove(StorageUtil.JWT);
  }

  ///////////////////////////////////
  Future<List<dynamic>> search(String search) async {
    return (await dio.get(url, queryParameters: {"search": search})).data['data'];
  }

  Future<dynamic> create(json) async {
    return await dio.post(url, data: json);
  }

  Future<bool> update(String id, json) async {
    await dio.put(
      url + "/${id}",
      data: json,
    );

    return true;
  }

  Future<dynamic> get(int id) async {
    return (await dio.get(
      url + "/${id}",
    ))
        .data;
  }
}
