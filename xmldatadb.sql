PGDMP         #                {        	   xmldatadb    15.1    15.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                        0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16435 	   xmldatadb    DATABASE     k   CREATE DATABASE xmldatadb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE xmldatadb;
                postgres    false            �            1259    16436    xmldatatable    TABLE     e   CREATE TABLE public.xmldatatable (
    link text,
    pwd text,
    usr text,
    req_method text
);
     DROP TABLE public.xmldatatable;
       public         heap    postgres    false            �          0    16436    xmldatatable 
   TABLE DATA           B   COPY public.xmldatatable (link, pwd, usr, req_method) FROM stdin;
    public          postgres    false    214          �   4   x��())���O�KI����)ӯ���������s��)�r9c� �+F��� ��     