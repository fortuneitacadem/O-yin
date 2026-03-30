import os
import sys
import subprocess

def start_odoo():
    # Yo'llar (paths)
    base_dir = os.path.dirname(os.path.abspath(__file__))
    odoo_bin = os.path.join(base_dir, "odoo-19.0", "odoo-bin")
    odoo_conf = os.path.join(base_dir, "odoo-19.0", "config", "odoo.conf")

    # Tekshiruvlar
    if not os.path.exists(odoo_bin):
        print(f"Xatolik: {odoo_bin} topilmadi!")
        return
    if not os.path.exists(odoo_conf):
        print(f"Xatolik: {odoo_conf} topilmadi!")
        return

    print("--- Odoo 19.0 (O-yin) ishga tushmoqda ---")
    print(f"Konfiguratsiya: {odoo_conf}")
    
    try:
        # Odoo serverini ishga tushirish
        subprocess.run([sys.executable, odoo_bin, "-c", odoo_conf])
    except KeyboardInterrupt:
        print("\n--- Odoo serveri to'xtatildi ---")
    except Exception as e:
        print(f"Xatolik yuz berdi: {e}")

if __name__ == "__main__":
    start_odoo()
