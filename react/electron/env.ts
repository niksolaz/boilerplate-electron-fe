import { join } from "path";
import { type, platform, tmpdir } from 'os'

// Restituisce il percorso del file corrente.
process.env.DIST_ELECTRON = join(__dirname, '..')

// Restituisce il percorso del file corrente.
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')

// Restituisce il percorso del file corrente.
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST


// Restituisce il nome del sistema operativo come 'Linux' on Linux, 'Darwin' on macOS, and 'Windows_NT' on Windows.
process.env.TYPE = type()

// Restituisce la directory predefinita del sistema operativo per i file temporanei come stringa.
process.env.TEMP_DIR = tmpdir()

// Restituisce una stringa che identifica la piattaforma del sistema operativo per la quale è stato compilato il binario Node.js ['aix', 'darwin', 'freebsd','linux', 'openbsd', 'sunos', and 'win32']
process.env.PLATFORM = platform()  