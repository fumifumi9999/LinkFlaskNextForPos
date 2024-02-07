from sqlalchemy import ForeignKey, String, DateTime, CHAR, Integer
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from datetime import datetime
from sqlalchemy import Boolean
 

class Base(DeclarativeBase):
    pass

class Product(Base): # 商品マスタ
    __tablename__ = 'products'
    id:Mapped[int] = mapped_column(primary_key=True, autoincrement=True) #商品一意キー
    code:Mapped[str] = mapped_column(CHAR(13), nullable=False, unique=True) #商品コード
    name:Mapped[str] = mapped_column(String(50)) #商品名称
    price:Mapped[int] = mapped_column(Integer, nullable=False) #商品単価

class Trade(Base): # 取引マスタ 
    __tablename__ = 'trades'
    id:Mapped[int] = mapped_column(primary_key=True, autoincrement=True) #取引一意キー
    datetime:Mapped[datetime] = mapped_column(DateTime, default=datetime.now) #取引日時
    emp_cd:Mapped[str] = mapped_column(CHAR(10), nullable=False) #レジ担当者コード
    store_cd:Mapped[str] = mapped_column(CHAR(5), nullable=False) #店舗コード
    pos_cd:Mapped[str] = mapped_column(CHAR(3), nullable=False) #POS機ID
    total_amt:Mapped[int] = mapped_column(Integer, nullable=False) #合計金額
 
class Trade_detail(Base): # 取引明細
    __tablename__ = 'trade_details'
    dtl_id:Mapped[int] = mapped_column(primary_key=True, autoincrement=True) #取引明細一意キー      
    trd_id:Mapped[int] = mapped_column(Integer, ForeignKey('trades.id'), nullable=False) #取引一意キー
    prd_id:Mapped[int] = mapped_column(Integer, ForeignKey('products.id'), nullable=False) #商品一意キー
    prd_code:Mapped[str] = mapped_column(CHAR(13), nullable=False) #商品コード
    prd_name:Mapped[str] = mapped_column(String(50), nullable=False) #商品名称
    prd_price:Mapped[int] = mapped_column(Integer, nullable=False) #商品単価
