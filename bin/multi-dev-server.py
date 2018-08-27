from subprocess import Popen
import getpass
import os.path
import socket, errno
import tempfile

def port_free(port):
  s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  try:
    s.bind(('0.0.0.0', port))
  except socket.error as e:
    if e.errno == errno.EADDRINUSE:
      return False
    else:
      raise e
  s.close()
  return True

def hash_port(name, offset):
  return hash(name) % 2**14 + offset

user = getpass.getuser()
user_config_path = '{}/{}-fidu-server.conf'.format(tempfile.gettempdir(), user)
user_symbol = user

# Check to see if a configuration for this user exists already
# This consistently prevents hash collisions and ports otherwise in use
if os.path.isfile(user_config_path):
  with open(user_config_path) as f:
    lines = f.readlines()
    user_symbol = lines[0]

# Validate that port is actually free
server_port = hash_port(user_symbol, 4200)
ng_port = hash_port(user_symbol, 8080)
while not port_free(server_port) or not port_free(ng_port):
  user_symbol += 'z'
  server_port = hash_port(user_symbol, 4200)
  ng_port = hash_port(user_symbol, 8080)

# Write (potentially) new configuration to cache
with open(user_config_path, 'w') as f:
  f.write(user_symbol)

# update proxy config
proxy_config_path = '{}/{}-fidu-proxy.conf.json'.format(tempfile.gettempdir(), user)
with open('./proxy.conf.json', 'r') as f:
  proxy_config = f.read()
proxy_config = proxy_config.replace('4200', str(server_port))
with open(proxy_config_path, 'w') as f:
  f.write(proxy_config)

# run the processes and wait for their completion
commands = [
  'npm run grunt w',
  'NODE_ENV=development PORT={} nodemon ./bin/www --watch ./dist/server'.format(server_port),
  'ng serve --proxy-config {} --no-progress --disable-host-check --port {}'.format(proxy_config_path, ng_port),
  'echo \"Express server is running on port {}.\"'.format(server_port),
  'echo \"Angular server (main entry point) is running on port {}.\"'.format(ng_port)
]
processes = [Popen(cmd, shell=True) for cmd in commands]
for p in processes: p.wait()
