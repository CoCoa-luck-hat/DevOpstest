# คู่มือการติดตั้ง Portainer สำหรับ DevOps V4

คู่มือนี้จะอธิบายวิธีการนำแอปพลิเคชันของคุณขึ้น Portainer เนื่องจากโปรเจกต์ของคุณใช้การ Build จาก Source Code โดยตรง (Local Build) จึงมี 2 วิธีหลักที่แนะนำครับ

## วิธีที่ 1: Local Terminal (แนะนำสำหรับทำในเครื่องตัวเอง)

วิธีนี้จะ Build คอนเทนเนอร์ในเครื่องของคุณ แล้วให้ Portainer เข้ามาจัดการต่อ ง่ายที่สุดสำหรับการพัฒนาครับ

1.  **เปิด Terminal** ในโฟลเดอร์โปรเจกต์:
    `c:\Users\cocoa\OneDrive\เดสก์ท็อป\EX\Devops\test_version4.0.0\round2`

2.  **รันคำสั่ง** Docker Compose:
    ```bash
    docker-compose up -d --build
    ```
    *คำสั่งนี้จะสร้าง (Build) Image ของ Frontend และ Backend และเริ่มทำงานทุก Service ให้ในเบื้องหลัง*

3.  **ไปที่ Portainer**:
    - ไปที่เมนู **Local** -> **Containers**
    - คุณจะเห็นคอนเทนเนอร์ของคุณทำงานอยู่ (เช่น `backend_version4`, `frontend_version4`, `db_test_version4`)
    - คุณสามารถดู Logs, Restart หรือ Stop ได้จากหน้านี้เลยครับ

## วิธีที่ 2: Portainer Stacks (ใช้ Git Repository)

วิธีนี้เหมาะสำหรับนำขึ้น Server จริง โดยให้ Portainer ไปดึงโค้ดมาจาก GitHub/GitLab แล้ว Build เอง **(คุณต้องอัปโหลดโค้ดขึ้น Git ก่อนนะครับ)**

1.  **อัปโหลดโค้ด** ไปยัง Git Repository (เช่น GitHub, GitLab)
2.  **เปิด Portainer** แล้วไปที่ **Stacks** -> **Add stack**
3.  **เลือกวิธี Build** เป็น **"Repository"**
4.  **กรอกข้อมูล**:
    - **Name**: `devops-v4` (ตั้งชื่อ Stack)
    - **Repository URL**: (ใส่ลิงก์ Git ของคุณ)
    - **Compose path**: `docker-compose.yml`
5.  **เปิดใช้งาน "Relative path volumes"** (ถ้ามีให้เลือก) หรือตรวจสอบ Path ของ Volume ใน `docker-compose.yml` ให้ถูกต้องกับ Server
6.  **กดปุ่ม "Deploy the stack"**

### ⚠️ ข้อควรระวัง (ห้ามใช้ปุ่ม Upload)
**อย่า**ใช้วิธี "Upload" ไฟล์ `docker-compose.yml` โดยตรงใน Portainer Stacks
*ทำไม?* เพราะวิธี Upload จะส่งไปแค่ไฟล์เดียว ไม่ได้ส่งโฟลเดอร์ `Back-End` และ `Font-End` ไปด้วย ทำให้ Portainer หาไฟล์โค้ดไม่เจอและ Build ไม่ผ่านครับ

## การแก้ปัญหาเบื้องต้น (Troubleshooting)

-   **"Image not found"**: ตรวจสอบว่าคุณได้รันคำสั่ง `docker-compose build` หรือ `docker-compose up --build` แล้วหรือยัง
-   **Database Connection Errors**: เช็ค Logs ของคอนเทนเนอร์ `db` และตรวจสอบว่าชื่อ Host ในโค้ด Backend ตรงกับชื่อ Service ใน Docker Compose (ซึ่งตั้งค่าไว้เป็น `db` แล้ว)
