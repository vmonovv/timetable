<script setup lang="ts"></script>

<template>
  <header class="mt-5 container mb-5">
    <div
      class="sub text-[#0070FF] bg-[#EEF5FF] inline-block px-6 py-1 rounded-[20px]"
    >
      Умбетжан Динмухамед Дарменулы
    </div>
    <div class="mins text-[#667085] mt-1">
      Врач высшей квалификационной категории. Стаж 17 лет
    </div>
  </header>

  <Table>
    <TableHeader class="border-t">
      <TableRow class="bg-[#FCFCFD]">
        <TableHead> Понедельник </TableHead>
        <TableHead>Модальность</TableHead>
        <TableHead>Вид исследований</TableHead>
        <TableHead>Пациент </TableHead>
        <TableHead>Описание </TableHead>
        <TableHead>Статус</TableHead>
        <TableHead>Прогнозирование</TableHead>
      </TableRow>
      <TableRow>
        <TableHead> 8:00-8:30</TableHead>
        <TableHead>X-ray</TableHead>
        <TableHead>Маммография</TableHead>
        <TableHead>Филимонов Виталий </TableHead>
        <TableHead>Компьютерная зависимость</TableHead>
        <TableHead>Подтверждёно</TableHead>
        <TableHead>Вероятность отмены 20%</TableHead>
      </TableRow>
    </TableHeader>
  </Table>
</template>
<style></style>
