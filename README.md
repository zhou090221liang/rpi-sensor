# rpi-sensor
## 树莓派传感器合集

### 安装方式
#### 1、安装BCM2835(如果没有安装过)
    $ wget https://raw.githubusercontent.com/zhou090221liang/rpi-sensor/master/Resource/bcm2835-1.58.tar.gz
    $ tar -zxvf bcm2835-1.58.tar.gz
    $ cd bcm2835-1.58
    $ ./configure
    $ make
    $ sudo make check
    $ sudo make install
#### 2、安装该模块
    $ npm i rpi-sensor

### 已经实现的功能列表
    1、DHT11/DHT22温湿度传感器 >= v0.1.0

### Node版本支持
    >= 6.x

### API
#### 首先，需要声明对象
	const sensor = require('rpi-sensor');
#### DHT11/DHT22 温湿度传感器
##### 创建一个DHT11或DHT22传感器

	new sensor.DHT11(BCM_no);
	new sensor.DHT22(BCM_no);

###### 参数代表传感器DATA串行接口所对应的BCM编号，而非Pin编号，示例：

	const dht11 = new sensor.DHT11(4);

##### 从传感器读取当前的温湿度数值

	dht11.read();

###### 该方法无需参数，返回值为JSON
    humidity：int 当前湿度百分比
    temperature：int 当前温度（摄氏度°C）
    isValid：bool 传感器返回的校验值和温湿度值是否匹配
    errors：int 错误，目前返回0


###### 返回值示例：
	{
        humidity: 32, 
        temperature: 31, 
        isValid: true, 
        errors: 0 
    }